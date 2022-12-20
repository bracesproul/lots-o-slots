import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type Account = MainEntity & Node & {
  __typename?: 'Account';
  balance: Scalars['Float'];
  canAcceptDeposits: Scalars['Boolean'];
  canWithdrawal: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  dailyWithdrawals: Scalars['Float'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  type: PaymentProvider;
  updatedAt?: Maybe<Scalars['DateTime']>;
  weeklyWithdrawals: Scalars['Float'];
};

/** Input type for creating an account. */
export type AddAccountInput = {
  /** The starting balance of the account. */
  balance?: InputMaybe<Scalars['Float']>;
  /** Whether an account can accept funds. */
  canAcceptDeposits?: InputMaybe<Scalars['Boolean']>;
  /** Whether an account can withdrawal funds. */
  canWithdrawal?: InputMaybe<Scalars['Boolean']>;
  /** The email address of the account. */
  email: Scalars['String'];
};

/** Input type for creating an email log. */
export type CreateEmailLogInput = {
  /** The email ID provided by gmail. */
  emailId: Scalars['String'];
};

/** Input type for creating a payment. */
export type CreatePaymentInput = {
  /** The payment amount. */
  amount: Scalars['Float'];
  /** The unique email identifier from the payment email. */
  emailId: Scalars['String'];
  /** The type of payment. */
  paymentType: PaymentType;
  /** If the payment has been processed. */
  processed?: InputMaybe<Scalars['Boolean']>;
  /** The payment provider. */
  provider: PaymentProvider;
  /** The name of the user that sent the payment. */
  senderName: Scalars['String'];
  /** The unique transaction id from the payment email. */
  transactionId: Scalars['String'];
  /** The unique identifier for the user. */
  userIdentifier: Scalars['String'];
};

/** Input type for creating a user. */
export type CreateUserInput = {
  /** The current users ballance. */
  balance: Scalars['Float'];
  /** The unique identifier for the user. */
  userIdentifier: Scalars['String'];
};

/** The created payment object. */
export type CreatedPaymentResponse = {
  __typename?: 'CreatedPaymentResponse';
  /** The created payment object. */
  payment: Payment;
  /** Whether or not the payment was created */
  success: Scalars['Boolean'];
};

export type EmailLog = MainEntity & Node & {
  __typename?: 'EmailLog';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailId: Scalars['String'];
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Input type for getting accounts. */
export type GetAllAccountsInput = {
  /** The payment provider type. */
  provider?: InputMaybe<PaymentProvider>;
};

/** Input type for getting payments. */
export type GetPaymentsInput = {
  /** The provider of the payment. */
  paymentProvider?: InputMaybe<PaymentProvider>;
  /** The type of the payment. */
  paymentType?: InputMaybe<PaymentType>;
  /** Whether or not the payment is processed. */
  processed?: InputMaybe<Scalars['Boolean']>;
};

/** The most recent update for the email log. */
export type GetRecentEmailLogUpdate = {
  __typename?: 'GetRecentEmailLogUpdate';
  /** The date of the most recent update. */
  createdAt: Scalars['DateTime'];
};

/** An object with standard fields for created and updated data */
export type MainEntity = {
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Input type for marking a payment as processed. */
export type MarkPaymentAsProcessedInput = {
  /** The payment ID. */
  id: Scalars['String'];
};

/** The updated payment object. */
export type MarkPaymentAsProcessedResponse = {
  __typename?: 'MarkPaymentAsProcessedResponse';
  /** The created payment object. */
  payment: Payment;
  /** Whether or not the payment was updated */
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccount: Account;
  createEmailLog: EmailLog;
  createPayment: CreatedPaymentResponse;
  markPaymentAsProcessed: MarkPaymentAsProcessedResponse;
};


export type MutationAddAccountArgs = {
  input: AddAccountInput;
};


export type MutationCreateEmailLogArgs = {
  input: CreateEmailLogInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationMarkPaymentAsProcessedArgs = {
  input: MarkPaymentAsProcessedInput;
};

/** ID */
export type Node = {
  id: Scalars['ID'];
};

export type Payment = MainEntity & Node & {
  __typename?: 'Payment';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailId: Scalars['String'];
  id: Scalars['ID'];
  paymentType: PaymentType;
  processed: Scalars['Boolean'];
  provider: PaymentProvider;
  senderName: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export enum PaymentProvider {
  CASHAPP = 'CASHAPP',
  PAYPAL = 'PAYPAL',
  ZELLE = 'ZELLE'
}

export enum PaymentType {
  DEPOSIT = 'DEPOSIT',
  PAYOUT = 'PAYOUT',
  WITHDRAWAL = 'WITHDRAWAL'
}

export type Query = {
  __typename?: 'Query';
  createUser: User;
  getAllAccounts: Array<Account>;
  getAllPayments: Array<Payment>;
  getAllUsers: Array<User>;
  getRecentUpdate: GetRecentEmailLogUpdate;
  seedData: Scalars['Boolean'];
};


export type QueryCreateUserArgs = {
  input: CreateUserInput;
};


export type QueryGetAllAccountsArgs = {
  input?: InputMaybe<GetAllAccountsInput>;
};


export type QueryGetAllPaymentsArgs = {
  input?: InputMaybe<GetPaymentsInput>;
};

export type User = MainEntity & Node & {
  __typename?: 'User';
  balance: Scalars['Float'];
  cashTag?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  userIdentifier_cashapp?: Maybe<Scalars['String']>;
  userIdentifier_paypal?: Maybe<Scalars['String']>;
  userIdentifier_zelle?: Maybe<Scalars['String']>;
};

export type GetAllCashappAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCashappAccountsQuery = { __typename?: 'Query', getAllAccounts: Array<{ __typename?: 'Account', id: string, updatedAt?: string | null, email: string, balance: number, canWithdrawal: boolean, canAcceptDeposits: boolean, dailyWithdrawals: number, weeklyWithdrawals: number }> };

export type GetAllAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAccountsQuery = { __typename?: 'Query', getAllAccounts: Array<{ __typename?: 'Account', id: string, email: string }> };

export type GetAllPaymentsQueryVariables = Exact<{
  input?: InputMaybe<GetPaymentsInput>;
}>;


export type GetAllPaymentsQuery = { __typename?: 'Query', getAllPayments: Array<{ __typename?: 'Payment', id: string, userId: string, senderName: string, amount: number, processed: boolean, provider: PaymentProvider, paymentType: PaymentType }> };


export const GetAllCashappAccountsDocument = gql`
    query GetAllCashappAccounts {
  getAllAccounts(input: {provider: CASHAPP}) {
    id
    updatedAt
    email
    balance
    canWithdrawal
    canAcceptDeposits
    dailyWithdrawals
    weeklyWithdrawals
  }
}
    `;

/**
 * __useGetAllCashappAccountsQuery__
 *
 * To run a query within a React component, call `useGetAllCashappAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCashappAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCashappAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCashappAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCashappAccountsQuery, GetAllCashappAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCashappAccountsQuery, GetAllCashappAccountsQueryVariables>(GetAllCashappAccountsDocument, options);
      }
export function useGetAllCashappAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCashappAccountsQuery, GetAllCashappAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCashappAccountsQuery, GetAllCashappAccountsQueryVariables>(GetAllCashappAccountsDocument, options);
        }
export type GetAllCashappAccountsQueryHookResult = ReturnType<typeof useGetAllCashappAccountsQuery>;
export type GetAllCashappAccountsLazyQueryHookResult = ReturnType<typeof useGetAllCashappAccountsLazyQuery>;
export type GetAllCashappAccountsQueryResult = Apollo.QueryResult<GetAllCashappAccountsQuery, GetAllCashappAccountsQueryVariables>;
export const GetAllAccountsDocument = gql`
    query GetAllAccounts {
  getAllAccounts {
    id
    email
  }
}
    `;

/**
 * __useGetAllAccountsQuery__
 *
 * To run a query within a React component, call `useGetAllAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAccountsQuery, GetAllAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAccountsQuery, GetAllAccountsQueryVariables>(GetAllAccountsDocument, options);
      }
export function useGetAllAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAccountsQuery, GetAllAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAccountsQuery, GetAllAccountsQueryVariables>(GetAllAccountsDocument, options);
        }
export type GetAllAccountsQueryHookResult = ReturnType<typeof useGetAllAccountsQuery>;
export type GetAllAccountsLazyQueryHookResult = ReturnType<typeof useGetAllAccountsLazyQuery>;
export type GetAllAccountsQueryResult = Apollo.QueryResult<GetAllAccountsQuery, GetAllAccountsQueryVariables>;
export const GetAllPaymentsDocument = gql`
    query GetAllPayments($input: GetPaymentsInput) {
  getAllPayments(input: $input) {
    id
    userId
    senderName
    amount
    processed
    provider
    paymentType
  }
}
    `;

/**
 * __useGetAllPaymentsQuery__
 *
 * To run a query within a React component, call `useGetAllPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPaymentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllPaymentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(GetAllPaymentsDocument, options);
      }
export function useGetAllPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(GetAllPaymentsDocument, options);
        }
export type GetAllPaymentsQueryHookResult = ReturnType<typeof useGetAllPaymentsQuery>;
export type GetAllPaymentsLazyQueryHookResult = ReturnType<typeof useGetAllPaymentsLazyQuery>;
export type GetAllPaymentsQueryResult = Apollo.QueryResult<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>;