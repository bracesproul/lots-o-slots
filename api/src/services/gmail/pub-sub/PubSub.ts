// Imports the Google Cloud client library
import { PubSub } from '@google-cloud/pubsub';
import { EmailLogRepository } from '@/repositories';
import { google, gmail_v1 } from 'googleapis';
import { authorize } from '../auth';
import { getCustomRepository } from 'typeorm';
import format from 'date-fns/format';
import { parseEmailBody, parseEmailHeaders } from '@/utils';
import { EmailObjectType } from '@/types';

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

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class MessageListener {
  // Creates a client; cache this for further use
  pubSubClient = new PubSub();
  topicNameAndId = 'projects/lots-o-slots/topics/cashapp-messages';
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
        topicName: 'projects/lots-o-slots/topics/cashapp-messages',
        labelIds: ['INBOX'],
      },
    });
    console.log('__WATCH CONFIRMED__', watcher);
  }

  async listenForMessages(): Promise<void> {
    const subscription = this.pubSubClient.subscription(
      'projects/lots-o-slots/subscriptions/cashapp-messages'
    );

    const handleMessages = async (message: any) => {
      console.log('✅ Received message');
      message.ack();
      const { messageIds } = await this.listMessages({
        count: 1,
      });
      const decodedBodies = await this.getMessages({ messageIds });
      console.log(decodedBodies);
    };

    console.log('📫 Started message listener!');
    subscription.on('message', handleMessages);
    console.log('😣 Ended message listener.');
  }

  async listMessages({
    count,
    query,
  }: {
    count: number;
    query?: string;
  }): Promise<ListMessagesResponse> {
    const emailLogRepo = new EmailLogRepository();
    const gmail = await this.authGmail();
    const { data } = await gmail.users.messages.list({
      userId: 'me',
      maxResults: count,
      q: query,
    });

    const messageIds: string[] = [];
    data.messages?.forEach(async (message: any) => {
      // if (message.id && !(await emailLogRepo.findOne(message.id))) {
      //   messageIds.push(message.id);
      //   await emailLogRepo.create({ emailId: message.id });
      // }
      if (message.id) {
        messageIds.push(message.id);
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
      console.log('all data', { to, from, subject, body, id });
      allData.push({ to, from, subject, body, id });
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
    const emailRepo = getCustomRepository(EmailLogRepository);
    const { createdAt } = await emailRepo.getRecentUpdate();
    const prettyDate = format(createdAt, 'YYYY/MM/DD');
    const { messageIds } = await this.listMessages({
      count: 500,
      query: `after:${prettyDate}`,
    });
    if (messageIds.length === 0) {
      return;
    }
    const messages = await this.getMessages({ messageIds });
    // @TODO: pass parsing function to parse requested messages;
  }
}
