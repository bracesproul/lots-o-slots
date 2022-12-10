import postgresConnection from '@/config/typeorm';
import serverSetup from './server';
import { Server } from 'http';
import { authorize as authorizeGoogle } from '@/services/gmail';
import { config as setupEnv } from 'dotenv-flow';
setupEnv({ silent: true });

function handleServerClose(exitCode: number, reason: string, server: Server) {
  const exit = (code: number) => () => {
    process.exit(code);
  };

  return () => {
    console.info(`😖 Server closing: ${reason}`);
    server.close(exit(exitCode));
  };
}

async function main() {
  await postgresConnection().then(async () => {
    console.info('🤠 Database connected!');
  });
  await authorizeGoogle();

  const app = await serverSetup();
  app.listen(process.env.PORT, () => {
    console.info(`🎂 Server ready!`);
  });
}

main().catch((error) => {
  console.error('caught error @ main', error);
  process.exit(1);
});
