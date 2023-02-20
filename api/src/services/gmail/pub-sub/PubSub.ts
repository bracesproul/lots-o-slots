// Imports the Google Cloud client library
import { PubSub } from '@google-cloud/pubsub';
import { EmailLogRepository, GcpTokenRepository } from '@/repositories';
import { google, gmail_v1 } from 'googleapis';
import { getOAuth2Client, authorize } from '../auth';
import { getCustomRepository, getRepository } from 'typeorm';
import format from 'date-fns/format';
import { parseEmailBody, parseEmailHeaders, findSender } from '@/utils';
import {
  BANK_OF_AMERICA_EMAIL,
  CASHAPP_EMAIL,
  EmailObjectType,
  PAYPAL_EMAIL,
  ProviderEmail,
  ProviderEmailSubject,
} from '@/types';
import { EmailLog } from '@/entities';
import {
  SupabaseBucket,
  SupabaseRawEmailFolderPath,
  uploadEmailToStorageBucket,
} from '@/services/subabase';

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
    return google.gmail({
      version: 'v1',
      auth,
    });
  }

  async watch() {
    const gmail = await this.authGmail();
    const res = await gmail.users.watch({
      userId: 'me',
      requestBody: {
        labelIds: ['INBOX'],
        topicName: `projects/lots-o-slots/topics/cashapp-messages`,
      },
    });
    console.log('👀 Watch re-initialized!', res);
  }

  async listenForMessages(): Promise<void> {
    const subscription = this.pubSubClient.subscription(
      'projects/lots-o-slots/subscriptions/cashapp-messages'
    );

    const handleMessages = async (message: any) => {
      console.log(
        '✅ Received message. Date:',
        format(new Date(), 'MM/dd/yyy h:mm a')
      );
      message.ack();

      const { messageIds } = await this.listMessages({
        count: 1,
      });

      await this.getMessages({ messageIds });
    };

    console.log('📫 Started message listener!');
    subscription.on('message', handleMessages);
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
    return Promise.all(
      messageIds.map(async (id) => {
        const { data } = await gmail.users.messages.get({
          userId: 'me',
          id,
        });

        // Parses the headers of the email.
        const { to, from, subject, originalSenderEmail } = parseEmailHeaders(
          data.payload?.headers ?? []
        );

        // Parses the body of the email, returns a string containing the entire body.
        const { body, cashappData, snippetData, paypalData } =
          await parseEmailBody(
            data.payload?.parts ?? [],
            data.snippet ?? '',
            from,
            subject,
            data.payload
          );

        const returnObject = {
          to,
          from,
          subject,
          body,
          id,
          originalSenderEmail,
        };

        // Uploads entire data object to Supabase Storage.
        // Feature flag protected and will only run if the proper env variable is present.
        await this.uploadEmailObjectToStorage({
          data,
          from,
          subject,
          id,
        });

        // Handles parsing and updating database and the corresponding accounts.
        await findSender(returnObject, cashappData, snippetData, paypalData);

        return returnObject;
      })
    );
  }

  async uploadEmailObjectToStorage({
    data,
    from,
    subject,
    id,
  }: {
    data: gmail_v1.Schema$Message;
    from: string;
    subject: string;
    id: string;
  }) {
    if (process.env.UPLOAD_TO_SUPABASE_BUCKET !== 'true') {
      console.warn('Feature not enabled. | UPLOAD_TO_SUPABASE_BUCKET');
      return;
    } else {
      console.log('Feature enabled. | UPLOAD_TO_SUPABASE_BUCKET');
    }

    const bankOfAmericaEmail = ProviderEmail.BANK_OF_AMERICA;
    const cashappEmail = ProviderEmail.CASHAPP;
    const paypalEmail = ProviderEmail.PAYPAL;

    const allowedEmailsToUpload = [
      BANK_OF_AMERICA_EMAIL,
      CASHAPP_EMAIL,
      PAYPAL_EMAIL,
    ];

    const cashappWithdrawalSubject = ProviderEmailSubject.CASHAPP_WITHDRAWALS;

    if (!allowedEmailsToUpload.includes(from)) {
      console.log('Email not allowed to upload.', from);
      return;
    }

    if (from === bankOfAmericaEmail) {
      const { path } = await uploadEmailToStorageBucket({
        body: JSON.stringify(data),
        folderPath: SupabaseRawEmailFolderPath.BANK_OF_AMERICA_DEPOSITS,
        file: `${id}.json`,
        bucket: SupabaseBucket.RAW_EMAILS,
      });
      if (path) {
        console.log('📤 Uploaded bank of america email to storage.');
      }
    } else console.log('not bank of america email.', from);

    if (subject.includes(cashappWithdrawalSubject) && from === cashappEmail) {
      const { path } = await uploadEmailToStorageBucket({
        body: JSON.stringify(data),
        folderPath: SupabaseRawEmailFolderPath.CASHAPP_WITHDRAWALS,
        file: `${id}.json`,
        bucket: SupabaseBucket.RAW_EMAILS,
      });
      if (path) {
        console.log('📤 Uploaded cashapp withdrawal email to storage.');
      }
    } else console.log('not cashapp email.', from, ' | ', subject);

    if (from === paypalEmail) {
      const { path } = await uploadEmailToStorageBucket({
        body: JSON.stringify(data),
        folderPath: SupabaseRawEmailFolderPath.PAYPAL_DEPOSITS,
        file: `${id}.json`,
        bucket: SupabaseBucket.RAW_EMAILS,
      });
      if (path) {
        console.log('📤 Uploaded paypal email to storage.');
      }
    } else console.log('not paypal email.', from);
  }

  async getMissingMessages(): Promise<void> {
    /**
     * Will get most recent logged email, use that date
     * to request all emails received after that date.
     * Update DB with that. Only then start the rest of the app
     */
    const emailRepo = getCustomRepository(EmailLogRepository);
    const history = await emailRepo.getRecentUpdate();
    if (!history?.createdAt) {
      console.info('No logs in email.');
      return;
    }
    const prettyDate = format(history.createdAt, 'yyyy/mm/dd');
    const { messageIds } = await this.listMessages({
      count: 500,
      query: `after:${prettyDate}`,
    });
    if (messageIds.length === 0) {
      return;
    }
    await this.getMessages({ messageIds });
  }
}
