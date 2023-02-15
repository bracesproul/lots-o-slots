import { EmailLogType } from '@/entities/EmailLog/EmailLog';
import { GameType, PaymentProvider } from '@/entities/Payment/Payment';
import { EmailObjectType } from '@/types';
import { LogType } from '@/utils/logEmail';
import axios from 'axios';
import { title } from 'process';

export default class DiscordLog {
  async logEmail({
    email,
    message,
    logType,
  }: {
    email: EmailObjectType;
    message: string;
    logType: LogType;
  }) {
    try {
      if (logType === LogType.INFO) {
        await this.logInfo({
          title: 'Parsing email',
          description: message,
          email,
        });
        return;
      }

      if (logType === LogType.ERROR) {
        await this.logError({
          title: 'Error while parsing email',
          description: message,
          email,
        });
        return;
      }

      if (logType === LogType.WARNING) {
        await this.logInfo({
          title: 'Warning while parsing email',
          description: message,
          email,
        });
        return;
      }
    } catch (error) {
      console.error(
        `ERROR ----- Discord Webhook | An Error occurred attempting to send a Discord webhook`,
        {
          error,
          email,
          message,
          logType,
        }
      );
      await this.logError({
        title: 'Error attempting to send a Discord webhook',
        description: 'Error attempting to send a Discord webhook',
        email,
      });
    }
  }

  async logError({
    title,
    description,
    email,
  }: {
    title: string;
    description: string;
    email: EmailObjectType;
  }) {
    await this.webhook({
      title,
      description,
      color: 156843,
      type: 'error',
      fields: [
        {
          name: 'From',
          value: email.from,
        },
        {
          name: 'Subject',
          value: email.subject,
        },
        {
          name: 'Email ID',
          value: email.id,
        },
      ],
    });
  }

  async logInfo({
    title,
    description,
    email,
  }: {
    title: string;
    description: string;
    email: EmailObjectType;
  }) {
    await this.webhook({
      title,
      description,
      color: 156843,
      type: 'log',
      fields: [
        {
          name: 'From',
          value: email.from,
        },
        {
          name: 'Subject',
          value: email.subject,
        },
        {
          name: 'Email ID',
          value: email.id,
        },
      ],
    });
  }

  async logUserPayment({
    paymentIdentifier,
    paymentProvider,
    amount,
    userId,
    gameType,
  }: {
    paymentIdentifier: string;
    paymentProvider: PaymentProvider;
    amount: number;
    userId?: string;
    gameType: GameType;
  }) {
    await this.webhook({
      title: 'New User Payment Received',
      description: '',
      color: 156843,
      type: 'log',
      fields: [
        {
          name: 'Payment Identifier',
          value: paymentIdentifier,
        },
        {
          name: 'Payment Provider',
          value: paymentProvider,
        },
        {
          name: 'Amount',
          value: amount.toString(),
        },
        {
          name: 'Game Type',
          value: gameType,
        },
        {
          name: 'User ID (?)',
          value: userId ?? 'n/a',
        },
      ],
    });
  }

  async logWarning({
    title,
    description,
    email,
  }: {
    title: string;
    description: string;
    email: EmailObjectType;
  }) {
    await this.webhook({
      title,
      description,
      color: 16753920,
      type: 'warning',
      fields: [
        {
          name: 'From',
          value: email.from,
        },
        {
          name: 'Subject',
          value: email.subject,
        },
        {
          name: 'Email ID',
          value: email.id,
        },
      ],
    });
  }

  async webhook({
    title,
    description,
    color,
    type,
    fields,
  }: {
    title: string;
    description: string;
    color: number;
    type: 'log' | 'error' | 'warning';
    fields?: { name: string; value: string }[];
  }) {
    if (process.env.NODE_ENV !== 'production') return;

    if (type === 'error' && !process.env.DISCORD_WEBHOOK_ERROR_URL) {
      console.warn('Cannot send error to discord without webhook env var');
      console.error(title);
      console.error(description);
      return;
    }

    if (type === 'log' && !process.env.DISCORD_WEBHOOK_LOG_URL) {
      console.warn('Cannot send log to discord without webhook env var');
      console.error(title);
      console.error(description);
      return;
    }

    const data = {
      embeds: [
        {
          title,
          description,
          fields,
          color,
        },
      ],
    };

    const config = {
      method: 'post',
      url:
        type === 'error'
          ? process.env.DISCORD_WEBHOOK_ERROR_URL
          : process.env.DISCORD_WEBHOOK_LOG_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };
    await axios(config);
  }
}
