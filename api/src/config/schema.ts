import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { PaymentResolver } from '@/resolvers';

export default (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [PaymentResolver],
    validate: process.env.NODE_ENV === 'production' ? true : false,
  });
