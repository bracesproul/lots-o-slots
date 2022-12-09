import { ApolloError, ApolloServer } from 'apollo-server-express';
import { buildSchema } from './';
import { QueryFailedError } from 'typeorm';

export async function startApolloServer(): Promise<ApolloServer> {
  const schema = await buildSchema();

  const apolloServer: ApolloServer = new ApolloServer({
    playground:
      process.env.NODE_ENV !== 'production'
        ? {
            settings: {
              ['request.credentials']: 'include',
            },
          }
        : undefined,
    schema,
    debug: !!(
      process.env.NODE_ENV &&
      ['development', 'test'].includes(process.env.NODE_ENV)
    ),
    plugins: [
      {
        requestDidStart(requestCtx) {
          if (requestCtx.request.query) {
            console.info(
              requestCtx.request.query
                .replace(/(\r\n|\n|\r)/gm, ' ')
                .replace(/( )+/gm, ' ')
            );
          }
        },
      },
    ],
    formatError: (error) => {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }

      // Do not expose typeorm errors to the client if not in development
      if (
        !['development', 'test'].includes(
          process.env.NODE_ENV ?? 'production'
        ) &&
        (error instanceof QueryFailedError ||
          error.originalError instanceof QueryFailedError)
      ) {
        return new ApolloError('Something went wrong');
      }
      return error;
    },
  });

  return apolloServer;
}
