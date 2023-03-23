import { ApolloError, ApolloServer } from 'apollo-server-express';
import { buildSchema } from './';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { UserV2 } from '@/entities';
import { getUserFromContext } from './auth';
import { ContextType } from '@/types';

export async function startApolloServer(): Promise<ApolloServer> {
  const schema = await buildSchema();

  const apolloServer: ApolloServer = new ApolloServer({
    playground: {
      settings: {
        ['request.credentials']: 'include',
      },
    },
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
    async context({ req, res }): Promise<ContextType> {
      const { user, supabaseRefreshToken } = await getUserFromContext(req, res);
      return {
        user,
        req,
        res,
        supabaseRefreshToken,
      };
    },
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
