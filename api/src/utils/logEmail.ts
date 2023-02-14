import { EmailLogType } from '@/entities/EmailLog/EmailLog';
import { EmailObjectType } from '@/types';
import { EmailLogRepository } from '@/repositories';
import { getCustomRepository } from 'typeorm';
import Discord from '@/services/discord/Discord';

export enum LogType {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}

export async function logEmail({
  email,
  description,
  type,
  processed = false,
  logType = LogType.INFO,
}: {
  email: EmailObjectType;
  description: string;
  type: EmailLogType;
  processed?: boolean;
  logType?: LogType;
}): Promise<void> {
  const discordLog = new Discord();

  await getCustomRepository(EmailLogRepository).create({
    emailId: email.id,
    type: type,
    processed: processed,
  });

  if (logType === LogType.INFO) {
    console.info(`INFO ------ Email | ${description} | ${email.id}`, {
      from: email.from,
      subject: email.subject,
      to: email.to,
    });
    await discordLog.logEmail({
      email,
      message: description,
      logType: LogType.INFO,
    });
    return;
  }

  if (logType === LogType.ERROR) {
    console.error(`ERROR ----- Email | ${description} | ${email.id}`, {
      from: email.from,
      subject: email.subject,
      to: email.to,
    });
    await discordLog.logEmail({
      email,
      message: description,
      logType: LogType.ERROR,
    });
    return;
  }

  if (logType === LogType.WARNING) {
    console.warn(`WARNING --- Email | ${description} | ${email.id}`, {
      from: email.from,
      subject: email.subject,
      to: email.to,
    });
    await discordLog.logEmail({
      email,
      message: description,
      logType: LogType.WARNING,
    });
    return;
  }
}
