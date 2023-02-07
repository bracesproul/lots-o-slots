import { Connection, createConnection, DatabaseType } from 'typeorm';
import * as entities from '@/entities';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config as setupEnv } from 'dotenv-flow';
setupEnv({ silent: true });
export const shouldCache = (): boolean => {
  return !['test', 'development'].includes(process.env.NODE_ENV ?? '');
};

/*
 * Create database connnection
 */
export default async function postgresConnection(): Promise<Connection> {
  const config = {
    database: process.env.POSTGRES_DATABASE,
    entities: Object.values(entities),
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    type: process.env.POSTGRES_CONNECTION as DatabaseType,
    username: process.env.POSTGRES_USERNAME,
    synchronize: false,
    dropSchema:
      process.env.NODE_ENV !== 'production' &&
      process.env.POSTGRES_DROP_SCHEMA === 'true',
    migrations: ['dist/migrations/*.js'],
    migrationsRun: true,
    cache: shouldCache(),
  } as PostgresConnectionOptions;

  // const config2 = {
  //   database: '',
  //   entities: Object.values(entities),
  //   host: '/cloudsql/',
  //   extra: {
  //     socketPath: '/cloudsql/',
  //   },
  //   password: '',
  //   port: 0000,
  //   type: process.env.POSTGRES_CONNECTION as DatabaseType,
  //   username: '',
  //   synchronize: false,
  //   dropSchema:
  //     process.env.NODE_ENV !== 'production' &&
  //     process.env.POSTGRES_DROP_SCHEMA === 'true',
  //   migrations: ['dist/migrations/*.js'],
  //   migrationsRun: true,
  //   cache: shouldCache(),
  // } as PostgresConnectionOptions;

  return await createConnection(config);
}
