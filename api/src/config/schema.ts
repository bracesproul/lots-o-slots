import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import {
  // PaymentResolver,
  UserResolver,
  EmailLogResolver,
  AccountResolver,
  SeedResolver,
  UserPaymentResolver,
  AuthResolver,
  UserV2Resolver,
  WithdrawalRequestResolver,
  TransactionResolver,
  EmailLogV2Resolver,
} from '@/resolvers';

export default (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [
      // PaymentResolver,
      UserResolver,
      EmailLogResolver,
      AccountResolver,
      SeedResolver,
      UserPaymentResolver,
      AuthResolver,
      UserV2Resolver,
      WithdrawalRequestResolver,
      TransactionResolver,
      EmailLogV2Resolver,
    ],
    // validate: process.env.NODE_ENV === 'production' ? true : false,
    validate: false,
  });
