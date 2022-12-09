import postgresConnection from '@/config/typeorm';
import serverSetup from './server';
import { Server } from 'http';
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

  const app = await serverSetup();
  app.listen(process.env.PORT, () => {
    console.info(`🎂 Server ready!`);
  });

  // process.on('uncaughtException', process.exit(1));
  // process.on(
  //   'unhandledRejection',
  //   handleServerClose(1, 'Unhandled Promise', server)
  // );
  // process.on('SIGTERM', handleServerClose(0, 'SIGTERM', server));
  // process.on('SIGINT', handleServerClose(0, 'SIGINT', server));
}

main().catch((error) => {
  console.error('caught error @ main', error);
  process.exit(1);
});
