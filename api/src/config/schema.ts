import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { PaymentResolver, UserResolver, EmailLogResolver } from '@/resolvers';

export default (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [PaymentResolver, UserResolver, EmailLogResolver],
    validate: process.env.NODE_ENV === 'production' ? true : false,
  });
