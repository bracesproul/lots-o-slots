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
  bitcoinAddress?: Maybe<Scalars['String']>;
  canAcceptDeposits: Scalars['Boolean'];
  canWithdrawal: Scalars['Boolean'];
  cashtag?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dailyWithdrawals: Scalars['Float'];
  defaultAccount?: Maybe<Scalars['Boolean']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  ethereumAddress?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  type: PaymentProvider;
  updatedAt?: Maybe<Scalars['DateTime']>;
  weeklyWithdrawals: Scalars['Float'];
};

/** Input type for creating an account. */
export type AddAccountInput = {
  /** The starting balance of the account. */
  balance?: InputMaybe<Scalars['Float']>;
  /** The bitcoin address of the account. */
  bitcoinAddress?: InputMaybe<Scalars['String']>;
  /** Whether an account can accept funds. */
  canAcceptDeposits?: InputMaybe<Scalars['Boolean']>;
  /** Whether an account can withdrawal funds. */
  canWithdrawal?: InputMaybe<Scalars['Boolean']>;
  /** The cashtag of the account. */
  cashtag?: InputMaybe<Scalars['String']>;
  /** The email address of the account. */
  email: Scalars['String'];
  /** The ethereum address of the account. */
  ethereumAddress?: InputMaybe<Scalars['String']>;
  /** The payment provider of the account. */
  paymentProvider: PaymentProvider;
  /** The amount sent from this account this week */
  weeklyWithdrawals?: InputMaybe<Scalars['Float']>;
};

/** The response from the checkAdminPagePassword query */
export type AuthorizeAdminUserPayload = {
  __typename?: 'AuthorizeAdminUserPayload';
  success: Scalars['Boolean'];
};

/** Response type for checking a user session */
export type CheckSessionPayload = {
  __typename?: 'CheckSessionPayload';
  refreshToken: Scalars['String'];
  success: Scalars['Boolean'];
  user: UserV2;
};

/** Input type for creating an account. */
export type CreateAccountInput = {
  balance: Scalars['Float'];
  identifier: Scalars['String'];
  name: Scalars['String'];
  type: PaymentProvider;
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

/** Payload type for deleting an account. */
export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  success: Scalars['Boolean'];
};

export type EmailLog = MainEntity & Node & {
  __typename?: 'EmailLog';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailId: Scalars['String'];
  id: Scalars['ID'];
  processed?: Maybe<Scalars['Boolean']>;
  type?: Maybe<EmailLogType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum EmailLogType {
  BTC = 'BTC',
  CASHAPP = 'CASHAPP',
  ETH = 'ETH',
  NO_PROVIDER = 'NO_PROVIDER',
  PAYPAL = 'PAYPAL',
  ZELLE = 'ZELLE'
}

export enum GameType {
  POKER = 'POKER',
  SLOTS = 'SLOTS'
}

/** Input type for getting an account by its id. */
export type GetAccountByIdInput = {
  id: Scalars['ID'];
};

/** Input type for getting accounts. */
export type GetAllAccountsInput = {
  /** The default payment providers. */
  defaultAccounts?: InputMaybe<Scalars['Boolean']>;
  /** The payment provider type. */
  provider?: InputMaybe<PaymentProvider>;
};

/** An email object. */
export type GetEmailByIdPayload = {
  __typename?: 'GetEmailByIdPayload';
  /** The body of the email. */
  body: Scalars['String'];
  /** Who the email was sent from. */
  from: Scalars['String'];
  /** The emails ID. */
  id: Scalars['String'];
  /** The subject of the email. */
  subject: Scalars['String'];
  /** Who the email was sent to. */
  to: Scalars['String'];
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

/** Input type for getting a signed url for a file. */
export type GetSupabaseSignedUrlInput = {
  bucket: SupabaseBucket;
  file: Scalars['String'];
  folder: SupabaseRawEmailFolderPath;
};

/** Payload for getting signed storage urls. */
export type GetSupabaseSignedUrlPayload = {
  __typename?: 'GetSupabaseSignedUrlPayload';
  bucket: SupabaseBucket;
  errorMessage?: Maybe<Scalars['String']>;
  file: Scalars['String'];
  folder: SupabaseRawEmailFolderPath;
  reason?: Maybe<Scalars['String']>;
  signedUrl?: Maybe<Scalars['String']>;
};

/** Input type for a user payment as processed. */
export type GetUserPaymentsInput = {
  /** The ID of the user payment. */
  processed: Scalars['Boolean'];
};

/** Input type for logging in a user */
export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** Response type for logging in a user */
export type LoginPayload = {
  __typename?: 'LoginPayload';
  session: SupabaseSessionResponse;
  success: Scalars['Boolean'];
  user: UserV2;
};

/** Response type for logging out a user */
export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  success: Scalars['Boolean'];
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
  /** Whether or not to mark the payment as processed. */
  processed: Scalars['Boolean'];
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
  /** @deprecated Use createAccount instead */
  addAccount: Account;
  createAccount: Account;
  createEmailLog: EmailLog;
  createPayment: CreatedPaymentResponse;
  createUser: User;
  createUserPayment: UserPayment;
  deleteAccount: DeleteAccountPayload;
  login: LoginPayload;
  logout: LogoutPayload;
  markPaymentAsProcessed: MarkPaymentAsProcessedResponse;
  markUserPaymentAsProcessed: MarkUserPaymentAsProcessedResult;
  signUp: SignUpPayload;
  switchDefaultAccount: Account;
  updateAccount: Account;
  updateUser: UpdatePayload;
};


export type MutationAddAccountArgs = {
  input: AddAccountInput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
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


export type MutationDeleteAccountArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkPaymentAsProcessedArgs = {
  input: MarkPaymentAsProcessedInput;
};


export type MutationMarkUserPaymentAsProcessedArgs = {
  input: MarkUserPaymentAsProcessedInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationSwitchDefaultAccountArgs = {
  input: SwitchDefaultAccountInput;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateInput;
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
  checkAdminPagePassword: AuthorizeAdminUserPayload;
  checkSession: CheckSessionPayload;
  getAccountById: Account;
  getAllAccounts: Array<Account>;
  getAllPayments: Array<Payment>;
  getAllUsers: Array<UserV2>;
  getEmailById: GetEmailByIdPayload;
  getRecentUpdate: GetRecentEmailLogUpdate;
  getSupabaseSignedUrl: GetSupabaseSignedUrlPayload;
  getUserById: UserV2;
  getUserBySupabaseId: UserV2;
  getUserPayments: Array<UserPayment>;
  seedData: Scalars['Boolean'];
};


export type QueryCheckAdminPagePasswordArgs = {
  password: Scalars['String'];
};


export type QueryGetAccountByIdArgs = {
  input: GetAccountByIdInput;
};


export type QueryGetAllAccountsArgs = {
  input?: InputMaybe<GetAllAccountsInput>;
};


export type QueryGetAllPaymentsArgs = {
  input?: InputMaybe<GetPaymentsInput>;
};


export type QueryGetEmailByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetSupabaseSignedUrlArgs = {
  input: GetSupabaseSignedUrlInput;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUserPaymentsArgs = {
  input?: InputMaybe<GetUserPaymentsInput>;
};

/** Input type for creating a new user */
export type SignUpInput = {
  data: UserData;
  email: Scalars['String'];
  password: Scalars['String'];
};

/** Response type for creating a new user */
export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  session: SupabaseSessionResponse;
  success: Scalars['Boolean'];
  user: UserV2;
};

export enum SupabaseBucket {
  RAW_EMAILS = 'RAW_EMAILS'
}

export enum SupabaseRawEmailFolderPath {
  BANK_OF_AMERICA_DEPOSITS = 'BANK_OF_AMERICA_DEPOSITS',
  CASHAPP_DEPOSITS = 'CASHAPP_DEPOSITS',
  CASHAPP_WITHDRAWALS = 'CASHAPP_WITHDRAWALS',
  PAYPAL_DEPOSITS = 'PAYPAL_DEPOSITS'
}

/** Response type for creating a new user with Supabase */
export type SupabaseSessionResponse = {
  __typename?: 'SupabaseSessionResponse';
  /** The access token jwt. It is recommended to set the JWT_EXPIRY to a shorter expiry value. */
  access_token: Scalars['String'];
  /** A timestamp of when the token will expire. Returned when a login is confirmed. */
  expires_at: Scalars['Float'];
  /** The number of seconds until the token expires (since it was issued). Returned when a login is confirmed. */
  expires_in: Scalars['Float'];
  /** The oauth provider refresh token. If present, this can be used to refresh the provider_token via the oauth provider's API. Not all oauth providers return a provider refresh token. If the provider_refresh_token is missing, please refer to the oauth provider's documentation for information on how to obtain the provider refresh token. */
  provider_refresh_token?: Maybe<Scalars['String']>;
  /** The oauth provider token. If present, this can be used to make external API requests to the oauth provider used. */
  provider_token?: Maybe<Scalars['String']>;
  /** A one-time used refresh token that never expires. */
  refresh_token: Scalars['String'];
  /** The type of token. Returned when a login is confirmed. */
  token_type: Scalars['String'];
};

/** Input type for switching the default type account. */
export type SwitchDefaultAccountInput = {
  /** The ID of the account. */
  id: Scalars['ID'];
  /** The payment provider of the account. */
  type: PaymentProvider;
};

/** Input type for updating an account. */
export type UpdateAccountInput = {
  balance?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  identifier?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  type: PaymentProvider;
};

/** Input type for updating a new user */
export type UpdateInput = {
  data?: InputMaybe<UserData>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  supabaseId: Scalars['String'];
};

/** Input type for updating a user */
export type UpdatePayload = {
  __typename?: 'UpdatePayload';
  success: Scalars['Boolean'];
  user: UserV2;
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

/** Additional user data */
export type UserData = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role: UserRole;
  username?: InputMaybe<Scalars['String']>;
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

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type UserV2 = MainEntity & Node & {
  __typename?: 'UserV2';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  role: UserRole;
  supabaseId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email?: string | null, password?: string | null } };

export type GetAllAccountsQueryVariables = Exact<{
  input?: InputMaybe<GetAllAccountsInput>;
}>;


export type GetAllAccountsQuery = { __typename?: 'Query', getAllAccounts: Array<{ __typename?: 'Account', id: string, email: string, balance: number, type: PaymentProvider, defaultAccount?: boolean | null, cashtag?: string | null, bitcoinAddress?: string | null, ethereumAddress?: string | null, name?: string | null }> };

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'DeleteAccountPayload', success: boolean } };

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', id: string, email: string, balance: number, type: PaymentProvider, defaultAccount?: boolean | null, cashtag?: string | null, bitcoinAddress?: string | null, ethereumAddress?: string | null, name?: string | null } };

export type GetAccountQueryVariables = Exact<{
  input: GetAccountByIdInput;
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccountById: { __typename?: 'Account', id: string, email: string, balance: number, type: PaymentProvider, defaultAccount?: boolean | null, cashtag?: string | null, bitcoinAddress?: string | null, ethereumAddress?: string | null, name?: string | null } };

export type UpdateAccountMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'Account', id: string, email: string, balance: number, type: PaymentProvider, defaultAccount?: boolean | null, cashtag?: string | null, bitcoinAddress?: string | null, ethereumAddress?: string | null, name?: string | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', success: boolean, session: { __typename?: 'SupabaseSessionResponse', refresh_token: string }, user: { __typename?: 'UserV2', supabaseId: string } } };

export type CreateUserPaymentMutationVariables = Exact<{
  input: CreateUserPaymentInput;
}>;


export type CreateUserPaymentMutation = { __typename?: 'Mutation', createUserPayment: { __typename?: 'UserPayment', id: string } };

export type GetDefaultAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDefaultAccountsQuery = { __typename?: 'Query', getAllAccounts: Array<{ __typename?: 'Account', id: string, type: PaymentProvider, email: string, cashtag?: string | null, bitcoinAddress?: string | null, ethereumAddress?: string | null }> };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = { __typename?: 'Query', getUserBySupabaseId: { __typename?: 'UserV2', supabaseId: string, password: string, id: string, firstName: string, lastName: string, email: string, username?: string | null } };

export type UpdateUserDataMutationVariables = Exact<{
  input: UpdateInput;
}>;


export type UpdateUserDataMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UpdatePayload', success: boolean, user: { __typename?: 'UserV2', password: string, id: string, firstName: string, lastName: string, email: string, username?: string | null } } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpPayload', success: boolean, session: { __typename?: 'SupabaseSessionResponse', refresh_token: string }, user: { __typename?: 'UserV2', supabaseId: string } } };

export type BasicAccountFragment = { __typename?: 'Account', id: string, email: string, balance: number, type: PaymentProvider, defaultAccount?: boolean | null, cashtag?: string | null, bitcoinAddress?: string | null, ethereumAddress?: string | null, name?: string | null };

export type BasicUserFragment = { __typename?: 'UserV2', id: string, firstName: string, lastName: string, email: string, username?: string | null };

export type PaymentFragmentFragment = { __typename?: 'Payment', id: string, userId: string, amount: number, processed: boolean, emailId: string, provider: PaymentProvider, senderName: string, transactionId?: string | null, paymentType: PaymentType };

export type UserFragment = { __typename?: 'UserV2', id: string, firstName: string, lastName: string, email: string, password: string, username?: string | null, role: UserRole, refreshToken?: string | null, supabaseId: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutPayload', success: boolean } };

export type CheckUserSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckUserSessionQuery = { __typename?: 'Query', checkSession: { __typename?: 'CheckSessionPayload', success: boolean, refreshToken: string, user: { __typename?: 'UserV2', id: string, firstName: string, lastName: string, email: string, password: string, username?: string | null, role: UserRole, refreshToken?: string | null, supabaseId: string } } };

export const BasicAccountFragmentDoc = gql`
    fragment BasicAccount on Account {
  id
  email
  balance
  type
  defaultAccount
  cashtag
  bitcoinAddress
  ethereumAddress
  name
}
    `;
export const BasicUserFragmentDoc = gql`
    fragment BasicUser on UserV2 {
  id
  firstName
  lastName
  email
  username
}
    `;
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
export const UserFragmentDoc = gql`
    fragment User on UserV2 {
  id
  firstName
  lastName
  email
  password
  username
  role
  refreshToken
  supabaseId
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
export const GetAllAccountsDocument = gql`
    query GetAllAccounts($input: GetAllAccountsInput) {
  getAllAccounts(input: $input) {
    ...BasicAccount
  }
}
    ${BasicAccountFragmentDoc}`;

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
 *      input: // value for 'input'
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
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($id: String!) {
  deleteAccount(id: $id) {
    success
  }
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ...BasicAccount
  }
}
    ${BasicAccountFragmentDoc}`;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const GetAccountDocument = gql`
    query GetAccount($input: GetAccountByIdInput!) {
  getAccountById(input: $input) {
    ...BasicAccount
  }
}
    ${BasicAccountFragmentDoc}`;

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions: Apollo.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
      }
export function useGetAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>;
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>;
export const UpdateAccountDocument = gql`
    mutation UpdateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ...BasicAccount
  }
}
    ${BasicAccountFragmentDoc}`;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, options);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    success
    session {
      refresh_token
    }
    user {
      supabaseId
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export const GetDefaultAccountsDocument = gql`
    query GetDefaultAccounts {
  getAllAccounts(input: {defaultAccounts: true}) {
    id
    type
    email
    cashtag
    bitcoinAddress
    ethereumAddress
  }
}
    `;

/**
 * __useGetDefaultAccountsQuery__
 *
 * To run a query within a React component, call `useGetDefaultAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDefaultAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDefaultAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDefaultAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetDefaultAccountsQuery, GetDefaultAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDefaultAccountsQuery, GetDefaultAccountsQueryVariables>(GetDefaultAccountsDocument, options);
      }
export function useGetDefaultAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDefaultAccountsQuery, GetDefaultAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDefaultAccountsQuery, GetDefaultAccountsQueryVariables>(GetDefaultAccountsDocument, options);
        }
export type GetDefaultAccountsQueryHookResult = ReturnType<typeof useGetDefaultAccountsQuery>;
export type GetDefaultAccountsLazyQueryHookResult = ReturnType<typeof useGetDefaultAccountsLazyQuery>;
export type GetDefaultAccountsQueryResult = Apollo.QueryResult<GetDefaultAccountsQuery, GetDefaultAccountsQueryVariables>;
export const GetUserDataDocument = gql`
    query GetUserData {
  getUserBySupabaseId {
    ...BasicUser
    supabaseId
    password
  }
}
    ${BasicUserFragmentDoc}`;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDataQuery(baseOptions?: Apollo.QueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
      }
export function useGetUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
        }
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<typeof useGetUserDataLazyQuery>;
export type GetUserDataQueryResult = Apollo.QueryResult<GetUserDataQuery, GetUserDataQueryVariables>;
export const UpdateUserDataDocument = gql`
    mutation UpdateUserData($input: UpdateInput!) {
  updateUser(input: $input) {
    success
    user {
      ...BasicUser
      password
    }
  }
}
    ${BasicUserFragmentDoc}`;
export type UpdateUserDataMutationFn = Apollo.MutationFunction<UpdateUserDataMutation, UpdateUserDataMutationVariables>;

/**
 * __useUpdateUserDataMutation__
 *
 * To run a mutation, you first call `useUpdateUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDataMutation, { data, loading, error }] = useUpdateUserDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserDataMutation, UpdateUserDataMutationVariables>(UpdateUserDataDocument, options);
      }
export type UpdateUserDataMutationHookResult = ReturnType<typeof useUpdateUserDataMutation>;
export type UpdateUserDataMutationResult = Apollo.MutationResult<UpdateUserDataMutation>;
export type UpdateUserDataMutationOptions = Apollo.BaseMutationOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    success
    session {
      refresh_token
    }
    user {
      supabaseId
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CheckUserSessionDocument = gql`
    query CheckUserSession {
  checkSession {
    success
    refreshToken
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useCheckUserSessionQuery__
 *
 * To run a query within a React component, call `useCheckUserSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckUserSessionQuery(baseOptions?: Apollo.QueryHookOptions<CheckUserSessionQuery, CheckUserSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUserSessionQuery, CheckUserSessionQueryVariables>(CheckUserSessionDocument, options);
      }
export function useCheckUserSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUserSessionQuery, CheckUserSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUserSessionQuery, CheckUserSessionQueryVariables>(CheckUserSessionDocument, options);
        }
export type CheckUserSessionQueryHookResult = ReturnType<typeof useCheckUserSessionQuery>;
export type CheckUserSessionLazyQueryHookResult = ReturnType<typeof useCheckUserSessionLazyQuery>;
export type CheckUserSessionQueryResult = Apollo.QueryResult<CheckUserSessionQuery, CheckUserSessionQueryVariables>;