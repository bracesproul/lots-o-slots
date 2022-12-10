import MessageListener from './PubSub';
import { EmailLog } from '@/entities';
import { EmailLogRepository } from '@/repositories';
import { getCustomRepository, getRepository } from 'typeorm';
import { getManager } from 'typeorm';

async function main() {
  const messageListener = new MessageListener();
  messageListener.listenForMessages();
}

// main();

async function updateEmailLog() {
  const manager = getManager();
  const emailLogRepo = manager.getCustomRepository(EmailLogRepository);
  const newEmailLog = await emailLogRepo.create({
    emailId: '175d0b2f5d5e1f5b',
  });
  console.log(newEmailLog);
}

updateEmailLog();
