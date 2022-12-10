// Imports the Google Cloud client library
import { PubSub } from '@google-cloud/pubsub';
import { EmailLogRepository } from '@/repositories';
import { google, gmail_v1 } from 'googleapis';
import { authorize } from '../auth';

type PubSubDataResponse = {
  emailAddress: string;
  historyId: number;
};

type MessageHandlerResponse = {
  historyId: number;
  messageCount: number;
};

type ListMessagesResponse = {
  messageIds: string[];
};

type GetMessagesResponse = {
  // todo implement
};

type EmailObjectType = {
  to: string;
  from: string;
  subject: string;
  body: string;
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseEmailHeaders(
  headers: gmail_v1.Schema$MessagePartHeader[]
): Omit<EmailObjectType, 'body'> {
  const schemaTo = headers?.find(
    (header) => header.name === 'To' && header.value
  );
  const to = schemaTo?.value;
  const schemaFrom = headers?.find(
    (header) => header.name === 'From' && header.value
  );
  const from = schemaFrom?.value?.split('<')[1].split('>')[0];
  const schemaSubject = headers?.find(
    (header) => header.name === 'Subject' && header.value
  );
  const subject = schemaSubject?.value;
  if (!to || !from || !subject) throw new Error('Missing email headers');
  return { to, from, subject };
}

export function parseEmailBody(parts: gmail_v1.Schema$MessagePart[]): string {
  let body = '';
  parts?.forEach((part) => {
    if (part.mimeType === 'text/html' && part?.body?.data) {
      body = Buffer.from(part.body?.data, 'base64').toString('utf-8');
    }
  });
  return body;
}

export default class MessageListener {
  // Creates a client; cache this for further use
  pubSubClient = new PubSub();
  subscriptionNameOrId = 'projects/lots-o-slots/subscriptions/cashapp-messages';
  async authGmail(): Promise<gmail_v1.Gmail> {
    const auth = await authorize();
    return google.gmail({ version: 'v1', auth });
  }

  async watch() {
    const auth = await authorize();
    const watcher = await google.gmail({ version: 'v1', auth }).users.watch({
      userId: 'me',
      requestBody: {
        topicName: this.subscriptionNameOrId,
        labelIds: ['INBOX'],
      },
    });
    console.log(watcher);
  }

  async listenForMessages(): Promise<void> {
    const subscription = this.pubSubClient.subscription(
      this.subscriptionNameOrId
    );

    // const messageHandler = async (message: any) => {
    //   message.ack();
    //   console.log('✅ Received message');
    //   const { messageIds } = await this.listMessages({
    //     count: 1,
    //   });
    //   const decodedBodies = await this.getMessages({ messageIds });
    //   console.log(decodedBodies);
    // };

    console.log('📫 Started message listener!');
    subscription.on('message', this.handleMessages);
  }

  async handleMessages(message: any) {
    message.ack();
    console.log('✅ Received message');
    const { messageIds } = await this.listMessages({
      count: 1,
    });
    const decodedBodies = await this.getMessages({ messageIds });
    console.log(decodedBodies);
  }

  async listMessages({
    count,
  }: {
    count: number;
  }): Promise<ListMessagesResponse> {
    const emailLogRepo = new EmailLogRepository();
    const gmail = await this.authGmail();
    const { data } = await gmail.users.messages.list({
      userId: 'me',
      maxResults: count,
    });

    const messageIds: string[] = [];
    data.messages?.forEach(async (message: any) => {
      if (message.id && !(await emailLogRepo.findOne(message.id))) {
        messageIds.push(message.id);
        await emailLogRepo.create({ emailId: message.id });
      }
    });
    return {
      messageIds,
    };
  }

  async getMessages({
    messageIds,
  }: {
    messageIds: string[];
  }): Promise<EmailObjectType[]> {
    const gmail = await this.authGmail();
    const allData: EmailObjectType[] = [];
    messageIds.forEach(async (id) => {
      const { data } = await gmail.users.messages.get({
        userId: 'me',
        id,
      });
      const { to, from, subject } = parseEmailHeaders(
        data.payload?.headers ?? []
      );
      const body = parseEmailBody(data.payload?.parts ?? []);
      allData.push({ to, from, subject, body });
    });

    console.log('after promise', allData);
    return allData;
  }

  async getMissingMessages(): Promise<void> {
    /**
     * Will get most recent logged email, use that date
     * to request all emails received after that date.
     * Update DB with that. Only then start the rest of the app
     */
  }
}
