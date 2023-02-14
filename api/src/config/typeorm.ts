import {
  Connection,
  createConnection,
  DatabaseType,
  getConnection,
} from 'typeorm';
// import * as entities from '@/entities';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config as setupEnv } from 'dotenv-flow';
import { join } from 'path';

setupEnv({ silent: true });

export const shouldCache = (): boolean => {
  return !['test', 'development'].includes(process.env.NODE_ENV ?? '');
};

/*
 * Create database connnection
 */
export default async function postgresConnection(): Promise<Connection> {
  let existingConnection: Connection | undefined;

  try {
    existingConnection = getConnection();
  } catch (e) {
    // no-op
  }

  if (existingConnection) return existingConnection;

  const config = {
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    type: 'postgres' as DatabaseType,
    username: process.env.POSTGRES_USERNAME,
    synchronize: false,
    dropSchema:
      process.env.NODE_ENV !== 'production' &&
      process.env.POSTGRES_DROP_SCHEMA === 'true',
    entities: [join(__dirname, '../entities/**/*{.ts,.js}')],
    migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
    migrationsRun: true,
    cache: shouldCache(),
    keepConnectionAlive: true,
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  } as PostgresConnectionOptions;

  return await createConnection(config);
}
