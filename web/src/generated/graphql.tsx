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
  cashtag?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dailyWithdrawals: Scalars['Float'];
  defaultAccount?: Maybe<Scalars['Boolean']>;
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
  /** The cashtag of the account. */
  cashtag?: InputMaybe<Scalars['String']>;
  /** The email address of the account. */
  email: Scalars['String'];
  /** The amount sent from this account this week */
  weeklyWithdrawals?: InputMaybe<Scalars['Float']>;
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
  /** The users cashtag. */
  cashtag: Scalars['String'];
  /** The users email. */
  email: Scalars['String'];
  /** The users password. */
  password: Scalars['String'];
  /** The users paypal email. */
  payPalEmail: Scalars['String'];
  /** The unique identifier for the user. */
  userIdentifier: Scalars['String'];
  /** The users zelle email. */
  zelleEmail: Scalars['String'];
};

/** Input type for creating a user payment. */
export type CreateUserPaymentInput = {
  /** The amount the user sent. */
  amount: Scalars['Float'];
  /** The game type. */
  gameType: GameType;
  /** The unique payment identifier. */
  paymentIdentifier: Scalars['String'];
  /** The payment provider. */
  paymentProvider: PaymentProvider;
  /** The ID of a relating user account. */
  userId?: InputMaybe<Scalars['String']>;
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

export enum GameType {
  POKER = 'POKER',
  SLOTS = 'SLOTS'
}

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

/** Input type for a user payment as processed. */
export type GetUserPaymentsInput = {
  /** The ID of the user payment. */
  processed: Scalars['Boolean'];
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

/** Input type for a user payment as processed. */
export type MarkUserPaymentAsProcessedInput = {
  /** The ID of the user payment. */
  userPaymentId: Scalars['String'];
};

/** The result of marking a user payment as processed. */
export type MarkUserPaymentAsProcessedResult = {
  __typename?: 'MarkUserPaymentAsProcessedResult';
  /** Whether or not the payment is marked as processed. */
  success: Scalars['Boolean'];
  /** The user payment marked as processed. */
  userPayment: UserPayment;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccount: Account;
  createEmailLog: EmailLog;
  createPayment: CreatedPaymentResponse;
  createUser: User;
  createUserPayment: UserPayment;
  markPaymentAsProcessed: MarkPaymentAsProcessedResponse;
  markUserPaymentAsProcessed: MarkUserPaymentAsProcessedResult;
  switchDefaultAccount: Account;
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


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserPaymentArgs = {
  input: CreateUserPaymentInput;
};


export type MutationMarkPaymentAsProcessedArgs = {
  input: MarkPaymentAsProcessedInput;
};


export type MutationMarkUserPaymentAsProcessedArgs = {
  input: MarkUserPaymentAsProcessedInput;
};


export type MutationSwitchDefaultAccountArgs = {
  input: SwitchDefaultAccountInput;
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
  BITCOIN = 'BITCOIN',
  CASHAPP = 'CASHAPP',
  ETHEREUM = 'ETHEREUM',
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
  getAllAccounts: Array<Account>;
  getAllPayments: Array<Payment>;
  getAllUsers: Array<User>;
  getRecentUpdate: GetRecentEmailLogUpdate;
  getUserPayments: Array<UserPayment>;
  seedData: Scalars['Boolean'];
};


export type QueryGetAllAccountsArgs = {
  input?: InputMaybe<GetAllAccountsInput>;
};


export type QueryGetAllPaymentsArgs = {
  input?: InputMaybe<GetPaymentsInput>;
};


export type QueryGetUserPaymentsArgs = {
  input?: InputMaybe<GetUserPaymentsInput>;
};

/** Input type for switching the default type account. */
export type SwitchDefaultAccountInput = {
  /** The ID of the account. */
  id: Scalars['ID'];
  /** The payment provider of the account. */
  type: PaymentProvider;
};

export type User = MainEntity & Node & {
  __typename?: 'User';
  balance: Scalars['Float'];
  cashTag?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  password?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userIdentifier_cashapp?: Maybe<Scalars['String']>;
  userIdentifier_paypal?: Maybe<Scalars['String']>;
  userIdentifier_zelle?: Maybe<Scalars['String']>;
};

export type UserPayment = MainEntity & Node & {
  __typename?: 'UserPayment';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  gameType: GameType;
  id: Scalars['ID'];
  paymentIdentifier: Scalars['String'];
  paymentProvider: PaymentProvider;
  processed: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['String']>;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email?: string | null, password?: string | null } };

export type GetAccountsQueryVariables = Exact<{
  input?: InputMaybe<GetAllAccountsInput>;
}>;


export type GetAccountsQuery = { __typename?: 'Query', getAllAccounts: Array<{ __typename?: 'Account', id: string, updatedAt?: string | null, email: string, balance: number, canWithdrawal: boolean, canAcceptDeposits: boolean, dailyWithdrawals: number, weeklyWithdrawals: number, cashtag?: string | null }> };

export type AddCashappAccountMutationVariables = Exact<{
  input: AddAccountInput;
}>;


export type AddCashappAccountMutation = { __typename?: 'Mutation', addAccount: { __typename?: 'Account', id: string, cashtag?: string | null, email: string } };

export type GetAllAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAccountsQuery = { __typename?: 'Query', getAllAccounts: Array<{ __typename?: 'Account', id: string, email: string, type: PaymentProvider }> };

export type SwitchDefaultAccountMutationVariables = Exact<{
  input: SwitchDefaultAccountInput;
}>;


export type SwitchDefaultAccountMutation = { __typename?: 'Mutation', switchDefaultAccount: { __typename?: 'Account', id: string, type: PaymentProvider, email: string } };

export type GetAllPaymentsQueryVariables = Exact<{
  input?: InputMaybe<GetPaymentsInput>;
}>;


export type GetAllPaymentsQuery = { __typename?: 'Query', getAllPayments: Array<{ __typename?: 'Payment', id: string, userId: string, senderName: string, amount: number, processed: boolean, provider: PaymentProvider, paymentType: PaymentType }> };

export type MarkPaymentAsProcessedMutationVariables = Exact<{
  input: MarkPaymentAsProcessedInput;
}>;


export type MarkPaymentAsProcessedMutation = { __typename?: 'Mutation', markPaymentAsProcessed: { __typename?: 'MarkPaymentAsProcessedResponse', success: boolean, payment: { __typename?: 'Payment', id: string, userId: string, amount: number, processed: boolean, emailId: string, provider: PaymentProvider, senderName: string, transactionId?: string | null, paymentType: PaymentType } } };

export type GetUserPaymentsQueryVariables = Exact<{
  input?: InputMaybe<GetUserPaymentsInput>;
}>;


export type GetUserPaymentsQuery = { __typename?: 'Query', getUserPayments: Array<{ __typename?: 'UserPayment', id: string, createdAt: string, paymentIdentifier: string, paymentProvider: PaymentProvider, amount: number, gameType: GameType }> };

export type MarkUserPaymentAsProcessedMutationVariables = Exact<{
  input: MarkUserPaymentAsProcessedInput;
}>;


export type MarkUserPaymentAsProcessedMutation = { __typename?: 'Mutation', markUserPaymentAsProcessed: { __typename?: 'MarkUserPaymentAsProcessedResult', success: boolean, userPayment: { __typename?: 'UserPayment', id: string, createdAt: string, paymentIdentifier: string, paymentProvider: PaymentProvider, amount: number, gameType: GameType } } };

export type CreateUserPaymentMutationVariables = Exact<{
  input: CreateUserPaymentInput;
}>;


export type CreateUserPaymentMutation = { __typename?: 'Mutation', createUserPayment: { __typename?: 'UserPayment', id: string } };

export type PaymentFragmentFragment = { __typename?: 'Payment', id: string, userId: string, amount: number, processed: boolean, emailId: string, provider: PaymentProvider, senderName: string, transactionId?: string | null, paymentType: PaymentType };

export const PaymentFragmentFragmentDoc = gql`
    fragment PaymentFragment on Payment {
  id
  userId
  amount
  processed
  emailId
  provider
  senderName
  transactionId
  paymentType
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    password
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetAccountsDocument = gql`
    query GetAccounts($input: GetAllAccountsInput) {
  getAllAccounts(input: $input) {
    id
    updatedAt
    email
    balance
    canWithdrawal
    canAcceptDeposits
    dailyWithdrawals
    weeklyWithdrawals
    cashtag
  }
}
    `;

/**
 * __useGetAccountsQuery__
 *
 * To run a query within a React component, call `useGetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
      }
export function useGetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
        }
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>;
export type GetAccountsLazyQueryHookResult = ReturnType<typeof useGetAccountsLazyQuery>;
export type GetAccountsQueryResult = Apollo.QueryResult<GetAccountsQuery, GetAccountsQueryVariables>;
export const AddCashappAccountDocument = gql`
    mutation AddCashappAccount($input: AddAccountInput!) {
  addAccount(input: $input) {
    id
    cashtag
    email
  }
}
    `;
export type AddCashappAccountMutationFn = Apollo.MutationFunction<AddCashappAccountMutation, AddCashappAccountMutationVariables>;

/**
 * __useAddCashappAccountMutation__
 *
 * To run a mutation, you first call `useAddCashappAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCashappAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCashappAccountMutation, { data, loading, error }] = useAddCashappAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCashappAccountMutation(baseOptions?: Apollo.MutationHookOptions<AddCashappAccountMutation, AddCashappAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCashappAccountMutation, AddCashappAccountMutationVariables>(AddCashappAccountDocument, options);
      }
export type AddCashappAccountMutationHookResult = ReturnType<typeof useAddCashappAccountMutation>;
export type AddCashappAccountMutationResult = Apollo.MutationResult<AddCashappAccountMutation>;
export type AddCashappAccountMutationOptions = Apollo.BaseMutationOptions<AddCashappAccountMutation, AddCashappAccountMutationVariables>;
export const GetAllAccountsDocument = gql`
    query GetAllAccounts {
  getAllAccounts {
    id
    email
    type
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
export const SwitchDefaultAccountDocument = gql`
    mutation SwitchDefaultAccount($input: SwitchDefaultAccountInput!) {
  switchDefaultAccount(input: $input) {
    id
    type
    email
  }
}
    `;
export type SwitchDefaultAccountMutationFn = Apollo.MutationFunction<SwitchDefaultAccountMutation, SwitchDefaultAccountMutationVariables>;

/**
 * __useSwitchDefaultAccountMutation__
 *
 * To run a mutation, you first call `useSwitchDefaultAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchDefaultAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchDefaultAccountMutation, { data, loading, error }] = useSwitchDefaultAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSwitchDefaultAccountMutation(baseOptions?: Apollo.MutationHookOptions<SwitchDefaultAccountMutation, SwitchDefaultAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SwitchDefaultAccountMutation, SwitchDefaultAccountMutationVariables>(SwitchDefaultAccountDocument, options);
      }
export type SwitchDefaultAccountMutationHookResult = ReturnType<typeof useSwitchDefaultAccountMutation>;
export type SwitchDefaultAccountMutationResult = Apollo.MutationResult<SwitchDefaultAccountMutation>;
export type SwitchDefaultAccountMutationOptions = Apollo.BaseMutationOptions<SwitchDefaultAccountMutation, SwitchDefaultAccountMutationVariables>;
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
export const MarkPaymentAsProcessedDocument = gql`
    mutation MarkPaymentAsProcessed($input: MarkPaymentAsProcessedInput!) {
  markPaymentAsProcessed(input: $input) {
    success
    payment {
      ...PaymentFragment
    }
  }
}
    ${PaymentFragmentFragmentDoc}`;
export type MarkPaymentAsProcessedMutationFn = Apollo.MutationFunction<MarkPaymentAsProcessedMutation, MarkPaymentAsProcessedMutationVariables>;

/**
 * __useMarkPaymentAsProcessedMutation__
 *
 * To run a mutation, you first call `useMarkPaymentAsProcessedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPaymentAsProcessedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPaymentAsProcessedMutation, { data, loading, error }] = useMarkPaymentAsProcessedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkPaymentAsProcessedMutation(baseOptions?: Apollo.MutationHookOptions<MarkPaymentAsProcessedMutation, MarkPaymentAsProcessedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkPaymentAsProcessedMutation, MarkPaymentAsProcessedMutationVariables>(MarkPaymentAsProcessedDocument, options);
      }
export type MarkPaymentAsProcessedMutationHookResult = ReturnType<typeof useMarkPaymentAsProcessedMutation>;
export type MarkPaymentAsProcessedMutationResult = Apollo.MutationResult<MarkPaymentAsProcessedMutation>;
export type MarkPaymentAsProcessedMutationOptions = Apollo.BaseMutationOptions<MarkPaymentAsProcessedMutation, MarkPaymentAsProcessedMutationVariables>;
export const GetUserPaymentsDocument = gql`
    query GetUserPayments($input: GetUserPaymentsInput) {
  getUserPayments(input: $input) {
    id
    createdAt
    paymentIdentifier
    paymentProvider
    amount
    gameType
  }
}
    `;

/**
 * __useGetUserPaymentsQuery__
 *
 * To run a query within a React component, call `useGetUserPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPaymentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserPaymentsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>(GetUserPaymentsDocument, options);
      }
export function useGetUserPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>(GetUserPaymentsDocument, options);
        }
export type GetUserPaymentsQueryHookResult = ReturnType<typeof useGetUserPaymentsQuery>;
export type GetUserPaymentsLazyQueryHookResult = ReturnType<typeof useGetUserPaymentsLazyQuery>;
export type GetUserPaymentsQueryResult = Apollo.QueryResult<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>;
export const MarkUserPaymentAsProcessedDocument = gql`
    mutation MarkUserPaymentAsProcessed($input: MarkUserPaymentAsProcessedInput!) {
  markUserPaymentAsProcessed(input: $input) {
    success
    userPayment {
      id
      createdAt
      paymentIdentifier
      paymentProvider
      amount
      gameType
    }
  }
}
    `;
export type MarkUserPaymentAsProcessedMutationFn = Apollo.MutationFunction<MarkUserPaymentAsProcessedMutation, MarkUserPaymentAsProcessedMutationVariables>;

/**
 * __useMarkUserPaymentAsProcessedMutation__
 *
 * To run a mutation, you first call `useMarkUserPaymentAsProcessedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkUserPaymentAsProcessedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markUserPaymentAsProcessedMutation, { data, loading, error }] = useMarkUserPaymentAsProcessedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkUserPaymentAsProcessedMutation(baseOptions?: Apollo.MutationHookOptions<MarkUserPaymentAsProcessedMutation, MarkUserPaymentAsProcessedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkUserPaymentAsProcessedMutation, MarkUserPaymentAsProcessedMutationVariables>(MarkUserPaymentAsProcessedDocument, options);
      }
export type MarkUserPaymentAsProcessedMutationHookResult = ReturnType<typeof useMarkUserPaymentAsProcessedMutation>;
export type MarkUserPaymentAsProcessedMutationResult = Apollo.MutationResult<MarkUserPaymentAsProcessedMutation>;
export type MarkUserPaymentAsProcessedMutationOptions = Apollo.BaseMutationOptions<MarkUserPaymentAsProcessedMutation, MarkUserPaymentAsProcessedMutationVariables>;
export const CreateUserPaymentDocument = gql`
    mutation CreateUserPayment($input: CreateUserPaymentInput!) {
  createUserPayment(input: $input) {
    id
  }
}
    `;
export type CreateUserPaymentMutationFn = Apollo.MutationFunction<CreateUserPaymentMutation, CreateUserPaymentMutationVariables>;

/**
 * __useCreateUserPaymentMutation__
 *
 * To run a mutation, you first call `useCreateUserPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserPaymentMutation, { data, loading, error }] = useCreateUserPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserPaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserPaymentMutation, CreateUserPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserPaymentMutation, CreateUserPaymentMutationVariables>(CreateUserPaymentDocument, options);
      }
export type CreateUserPaymentMutationHookResult = ReturnType<typeof useCreateUserPaymentMutation>;
export type CreateUserPaymentMutationResult = Apollo.MutationResult<CreateUserPaymentMutation>;
export type CreateUserPaymentMutationOptions = Apollo.BaseMutationOptions<CreateUserPaymentMutation, CreateUserPaymentMutationVariables>;