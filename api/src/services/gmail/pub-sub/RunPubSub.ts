import MessageListener from './PubSub';
import { EmailLog } from '@/entities';
import { EmailLogRepository } from '@/repositories';
import { getCustomRepository, getRepository } from 'typeorm';
import { getManager } from 'typeorm';

async function main() {
  const messageListener = new MessageListener();
  // messageListener.listenForMessages();
  messageListener.watch();
}

// main();
