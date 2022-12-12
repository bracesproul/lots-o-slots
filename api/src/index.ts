import postgresConnection from '@/config/typeorm';
import serverSetup from './server';
import { authorize as authorizeGoogle } from '@/services/gmail';
import { MessageListener } from '@/services';

import { config as setupEnv } from 'dotenv-flow';
setupEnv({ silent: true });

async function main() {
  await postgresConnection().then(async () => {
    console.info('🤠 Database connected!');
  });
  await authorizeGoogle();
  const messageListener = new MessageListener();
  if (process.env.NODE_ENV === 'production') {
    console.log('Getting message history...');
    messageListener.getMissingMessages();
  }
  messageListener.listenForMessages();

  const app = await serverSetup();
  app.listen(process.env.PORT, () => {
    console.info(`🎂 Server ready!`);
  });
}

main().catch((error) => {
  console.error('caught error @ main', error);
  process.exit(1);
});
