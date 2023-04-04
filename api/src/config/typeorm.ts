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

const DEFAULT_INPUT = {
  name: 'default',
  checkForExistingConnection: true,
};

export default async function postgresConnection(input?: {
  name?: string;
  checkForExistingConnection?: boolean;
}): Promise<Connection> {
  const inputToUse = { ...DEFAULT_INPUT, ...input };

  console.log('🤠 Creating database connection...', inputToUse);
  let existingConnection: Connection | undefined;

  try {
    if (inputToUse.checkForExistingConnection) {
      existingConnection = getConnection();
    }
  } catch (e) {
    // no-op
    // console.log('error getting connection', e);
  }

  if (existingConnection) {
    console.log('🤠 Database connection already exists');
    return existingConnection;
  }

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
      migrationsDir: join(__dirname, '../migrations'),
    },
    name: inputToUse.name,
    default: true,
  } as PostgresConnectionOptions;

  return await createConnection(config);
}
