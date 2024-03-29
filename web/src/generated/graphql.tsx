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

export type BasicUser = {
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Input type for bulk uploading users */
export type BulkUploadUsersInput = {
  users: Array<BasicUser>;
};

export type BulkUploadUsersPayload = {
  __typename?: 'BulkUploadUsersPayload';
  success: Scalars['Boolean'];
  users: Array<UserV2>;
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

/** Input type for creating a transaction. */
export type CreateTransactionInput = {
  /** The transaction amount. */
  amount: Scalars['Float'];
  /** The unique email identifier from the transaction email. */
  emailLogId?: InputMaybe<Scalars['String']>;
  /** The type of transaction. */
  paymentType: PaymentType;
  /** The transaction provider. */
  provider: PaymentProvider;
  /** The name of the user that sent the transaction. */
  senderName: Scalars['String'];
  /** The payments status. */
  status: PaymentStatus;
  /** The unique identifier for the user. */
  userId?: InputMaybe<Scalars['String']>;
};

/** Input type for creating a user */
export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  username?: InputMaybe<Scalars['String']>;
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
  /** The users Firekin username. */
  username?: InputMaybe<Scalars['String']>;
};

/** Input type for creating a new withdrawal request */
export type CreateWithdrawalRequestInput = {
  amount: Scalars['Float'];
  payoutAddress: Scalars['String'];
  payoutMethod: PaymentProvider;
  status?: InputMaybe<WithdrawalRequestStatus>;
  userId: Scalars['ID'];
};

/** Response type for creating a new withdrawal request */
export type CreateWithdrawalRequestPayload = {
  __typename?: 'CreateWithdrawalRequestPayload';
  success: Scalars['Boolean'];
  withdrawalRequest: WithdrawalRequest;
};

/** The created transaction object. */
export type CreatedTransactionResponse = {
  __typename?: 'CreatedTransactionResponse';
  /** Whether or not the transaction was created */
  success: Scalars['Boolean'];
  /** The created transaction object. */
  transaction: Transaction;
};

/** Payload type for deleting an account. */
export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  success: Scalars['Boolean'];
};

/** Payload type for deleting an email log. */
export type DeleteEmailLogPayload = {
  __typename?: 'DeleteEmailLogPayload';
  success: Scalars['Boolean'];
};

/** Payload type for deleting a user transaction. */
export type DeleteTransactionPayload = {
  __typename?: 'DeleteTransactionPayload';
  success: Scalars['Boolean'];
};

/** Response type for deleting a user */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  success: Scalars['Boolean'];
};

/** Payload type for deleting a user payment. */
export type DeleteUserPaymentPayload = {
  __typename?: 'DeleteUserPaymentPayload';
  success: Scalars['Boolean'];
};

/** Response type for deleting a withdrawal request */
export type DeleteWithdrawalRequestPayload = {
  __typename?: 'DeleteWithdrawalRequestPayload';
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

export type EmailLogV2 = MainEntity & Node & {
  __typename?: 'EmailLogV2';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailId: Scalars['Float'];
  id: Scalars['ID'];
  processed: Scalars['Boolean'];
  receivedAt: Scalars['DateTime'];
  snippet?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

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

/** Input type for getting all email logs. */
export type GetAllEmailLogsInput = {
  hasTransactions?: InputMaybe<Scalars['Boolean']>;
};

/** Input type for get all users */
export type GetAllUsersInput = {
  isAvailable?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
};

/** Total count of all generated accounts */
export type GetGeneratedAccountCountPayload = {
  __typename?: 'GetGeneratedAccountCountPayload';
  count: Scalars['Float'];
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

/** Input type for getting payments. */
export type GetTransactionsInput = {
  /** The provider of the transaction. */
  paymentProvider?: InputMaybe<PaymentProvider>;
  /** The type of the transaction. */
  paymentType?: InputMaybe<PaymentType>;
  /** A transactions status. */
  status?: InputMaybe<PaymentStatus>;
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
  bulkUploadUsers: BulkUploadUsersPayload;
  createAccount: Account;
  createEmailLog: EmailLog;
  createTransaction: CreatedTransactionResponse;
  createUser: UserV2;
  createUserPayment: UserPayment;
  createWithdrawalRequest: CreateWithdrawalRequestPayload;
  deleteAccount: DeleteAccountPayload;
  deleteEmailLog: DeleteEmailLogPayload;
  deleteTransaction: DeleteTransactionPayload;
  deleteUser: DeleteUserPayload;
  deleteUserPayment: DeleteUserPaymentPayload;
  deleteWithdrawalRequest: DeleteWithdrawalRequestPayload;
  login: LoginPayload;
  logout: LogoutPayload;
  makeAccountDefault: Account;
  markUserPaymentAsProcessed: MarkUserPaymentAsProcessedResult;
  signUp: SignUpPayload;
  switchDefaultAccount: Account;
  updateAccount: Account;
  updateTransactionStatus: UpdateTransactionStatusPayload;
  updateUser: UpdatePayload;
  updateUserAsAdmin: UpdatePayload;
  updateUserPaymentStatus: UpdateUserPaymentStatusPayload;
  updateWithdrawalRequestStatus: UpdateWithdrawalRequestStatusPayload;
};


export type MutationAddAccountArgs = {
  input: AddAccountInput;
};


export type MutationBulkUploadUsersArgs = {
  input: BulkUploadUsersInput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateEmailLogArgs = {
  input: CreateEmailLogInput;
};


export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserPaymentArgs = {
  input: CreateUserPaymentInput;
};


export type MutationCreateWithdrawalRequestArgs = {
  input: CreateWithdrawalRequestInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['String'];
};


export type MutationDeleteEmailLogArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserPaymentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteWithdrawalRequestArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMakeAccountDefaultArgs = {
  id: Scalars['String'];
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


export type MutationUpdateTransactionStatusArgs = {
  input: UpdateTransactionStatusInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateInput;
};


export type MutationUpdateUserAsAdminArgs = {
  input: UpdateUserAsAdminInput;
};


export type MutationUpdateUserPaymentStatusArgs = {
  input: UpdateUserPaymentStatusInput;
};


export type MutationUpdateWithdrawalRequestStatusArgs = {
  input: UpdateWithdrawalRequestStatusInput;
};

/** ID */
export type Node = {
  id: Scalars['ID'];
};

export enum PaymentProvider {
  BITCOIN = 'BITCOIN',
  CASHAPP = 'CASHAPP',
  CHASE = 'CHASE',
  ETHEREUM = 'ETHEREUM',
  PAYPAL = 'PAYPAL',
  ZELLE = 'ZELLE'
}

export enum PaymentStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PENDING = 'PENDING'
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
  getAllEmailLogs: Array<EmailLogV2>;
  getAllTransactions: Array<Transaction>;
  getAllUsers: Array<UserV2>;
  getAllWithdrawalRequests: Array<WithdrawalRequest>;
  getEmailById: EmailLogV2;
  getGeneratedAccount: UserV2;
  getGeneratedAccountCount: GetGeneratedAccountCountPayload;
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


export type QueryGetAllEmailLogsArgs = {
  input?: InputMaybe<GetAllEmailLogsInput>;
};


export type QueryGetAllTransactionsArgs = {
  input?: InputMaybe<GetTransactionsInput>;
};


export type QueryGetAllUsersArgs = {
  input?: InputMaybe<GetAllUsersInput>;
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

export type Transaction = MainEntity & Node & {
  __typename?: 'Transaction';
  accountId?: Maybe<Scalars['String']>;
  amount: Scalars['Float'];
  bankOfAmericaTransactionId?: Maybe<Scalars['String']>;
  bitcoinTransactionId?: Maybe<Scalars['String']>;
  cashAppTransactionId?: Maybe<Scalars['String']>;
  chaseTransactionId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailLogId: Scalars['String'];
  ethereumTransactionId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  payPalTransactionId?: Maybe<Scalars['String']>;
  paymentType: PaymentType;
  provider: PaymentProvider;
  senderName: Scalars['String'];
  status: PaymentStatus;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['String']>;
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

/** Input type for updating a user transaction status. */
export type UpdateTransactionStatusInput = {
  id: Scalars['ID'];
  status: PaymentStatus;
};

/** Payload type for updating a user transaction status. */
export type UpdateTransactionStatusPayload = {
  __typename?: 'UpdateTransactionStatusPayload';
  success: Scalars['Boolean'];
  transaction: Transaction;
};

/** Input type for updating a new user as admin */
export type UpdateUserAsAdminInput = {
  data: UserData;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  password?: InputMaybe<Scalars['String']>;
};

/** Input type for updating a user payment status. */
export type UpdateUserPaymentStatusInput = {
  id: Scalars['ID'];
  processed: Scalars['Boolean'];
};

/** Payload type for updating a user payment status. */
export type UpdateUserPaymentStatusPayload = {
  __typename?: 'UpdateUserPaymentStatusPayload';
  success: Scalars['Boolean'];
  userPayment: UserPayment;
};

/** Input type for updating a withdrawal requests status */
export type UpdateWithdrawalRequestStatusInput = {
  id: Scalars['ID'];
  status: WithdrawalRequestStatus;
};

/** Response type for creating a new user */
export type UpdateWithdrawalRequestStatusPayload = {
  __typename?: 'UpdateWithdrawalRequestStatusPayload';
  success: Scalars['Boolean'];
  withdrawalRequest: WithdrawalRequest;
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
  user?: Maybe<UserV2>;
  /** @deprecated Use userV2Id instead */
  userId?: Maybe<Scalars['String']>;
  userV2Id?: Maybe<Scalars['String']>;
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
  isAvailable?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  role: UserRole;
  supabaseId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  userLogins?: Maybe<Array<UserV2LoginLog>>;
  username?: Maybe<Scalars['String']>;
};

export type UserV2LoginLog = MainEntity & Node & {
  __typename?: 'UserV2LoginLog';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  loginDate: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type WithdrawalRequest = MainEntity & Node & {
  __typename?: 'WithdrawalRequest';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  payoutAddress: Scalars['String'];
  payoutMethod: PaymentProvider;
  status: WithdrawalRequestStatus;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId: Scalars['ID'];
};

export enum WithdrawalRequestStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserV2', id: string, email: string, password: string } };

export type GetAllAccountsQueryVariables = Exact<{
  input?: InputMaybe<GetAllAccountsInput>;
}>;


export type GetAllAccountsQuery = { __typename?: 'Query', getAllAccounts: Array<{ __typename?: 'Account', updatedAt?: string | null, id: string, email: string, balance: number, type: PaymentProvider, defaultAccount?: boolean | null, cashtag?: string | null, bitcoinAddress?: string | null, ethereumAddress?: string | null, name?: string | null }> };

export type MakeAccountDefaultMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type MakeAccountDefaultMutation = { __typename?: 'Mutation', makeAccountDefault: { __typename?: 'Account', id: string } };

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

export type DeleteEmailLogMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteEmailLogMutation = { __typename?: 'Mutation', deleteEmailLog: { __typename?: 'DeleteEmailLogPayload', success: boolean } };

export type GetEmailLogsQueryVariables = Exact<{
  input?: InputMaybe<GetAllEmailLogsInput>;
}>;


export type GetEmailLogsQuery = { __typename?: 'Query', getAllEmailLogs: Array<{ __typename?: 'EmailLogV2', id: string, subject: string, body: string, receivedAt: string }> };

export type UpdateTransactionStatusMutationVariables = Exact<{
  input: UpdateTransactionStatusInput;
}>;


export type UpdateTransactionStatusMutation = { __typename?: 'Mutation', updateTransactionStatus: { __typename?: 'UpdateTransactionStatusPayload', success: boolean, transaction: { __typename?: 'Transaction', createdAt: string, id: string, amount: number, status: PaymentStatus, provider: PaymentProvider, paymentType: PaymentType, senderName: string } } };

export type UpdateUserPaymentStatusMutationVariables = Exact<{
  input: UpdateUserPaymentStatusInput;
}>;


export type UpdateUserPaymentStatusMutation = { __typename?: 'Mutation', updateUserPaymentStatus: { __typename?: 'UpdateUserPaymentStatusPayload', success: boolean, userPayment: { __typename?: 'UserPayment', createdAt: string, id: string, paymentIdentifier: string, paymentProvider: PaymentProvider, amount: number, processed: boolean, gameType: GameType, user?: { __typename?: 'UserV2', id: string, firstName: string, lastName: string, username?: string | null } | null } } };

export type CreateTransactionMutationVariables = Exact<{
  input: CreateTransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'CreatedTransactionResponse', success: boolean, transaction: { __typename?: 'Transaction', id: string, amount: number, status: PaymentStatus, provider: PaymentProvider, paymentType: PaymentType, senderName: string } } };

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction: { __typename?: 'DeleteTransactionPayload', success: boolean } };

export type DeleteUserPaymentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserPaymentMutation = { __typename?: 'Mutation', deleteUserPayment: { __typename?: 'DeleteUserPaymentPayload', success: boolean } };

export type GetWithdrawalRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWithdrawalRequestsQuery = { __typename?: 'Query', getAllWithdrawalRequests: Array<{ __typename?: 'WithdrawalRequest', createdAt: string, id: string, amount: number, status: WithdrawalRequestStatus, payoutMethod: PaymentProvider, payoutAddress: string }> };

export type GetProcessedTransactionsQueryVariables = Exact<{
  input?: InputMaybe<GetTransactionsInput>;
}>;


export type GetProcessedTransactionsQuery = { __typename?: 'Query', getAllTransactions: Array<{ __typename?: 'Transaction', createdAt: string, id: string, amount: number, status: PaymentStatus, provider: PaymentProvider, paymentType: PaymentType, senderName: string }> };

export type GetPendingTransactionsQueryVariables = Exact<{
  input?: InputMaybe<GetTransactionsInput>;
}>;


export type GetPendingTransactionsQuery = { __typename?: 'Query', getAllTransactions: Array<{ __typename?: 'Transaction', createdAt: string, id: string, amount: number, status: PaymentStatus, provider: PaymentProvider, paymentType: PaymentType, senderName: string }> };

export type GetProcessedUserPaymentsQueryVariables = Exact<{
  input?: InputMaybe<GetUserPaymentsInput>;
}>;


export type GetProcessedUserPaymentsQuery = { __typename?: 'Query', getUserPayments: Array<{ __typename?: 'UserPayment', createdAt: string, id: string, paymentIdentifier: string, paymentProvider: PaymentProvider, amount: number, processed: boolean, gameType: GameType, user?: { __typename?: 'UserV2', id: string, firstName: string, lastName: string, username?: string | null } | null }> };

export type GetPendingUserPaymentsQueryVariables = Exact<{
  input?: InputMaybe<GetUserPaymentsInput>;
}>;


export type GetPendingUserPaymentsQuery = { __typename?: 'Query', getUserPayments: Array<{ __typename?: 'UserPayment', createdAt: string, id: string, paymentIdentifier: string, paymentProvider: PaymentProvider, amount: number, processed: boolean, gameType: GameType, user?: { __typename?: 'UserV2', id: string, firstName: string, lastName: string, username?: string | null } | null }> };

export type UpdateWithdrawalRequestStatusMutationVariables = Exact<{
  input: UpdateWithdrawalRequestStatusInput;
}>;


export type UpdateWithdrawalRequestStatusMutation = { __typename?: 'Mutation', updateWithdrawalRequestStatus: { __typename?: 'UpdateWithdrawalRequestStatusPayload', success: boolean, withdrawalRequest: { __typename?: 'WithdrawalRequest', id: string, amount: number, status: WithdrawalRequestStatus, payoutMethod: PaymentProvider, payoutAddress: string } } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'DeleteUserPayload', success: boolean } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'UserV2', role: UserRole, createdAt: string, id: string, firstName: string, lastName: string, email: string, username?: string | null }> };

export type GetGeneratedAccountCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGeneratedAccountCountQuery = { __typename?: 'Query', getGeneratedAccountCount: { __typename?: 'GetGeneratedAccountCountPayload', count: number } };

export type BulkUploadUsersMutationVariables = Exact<{
  input: BulkUploadUsersInput;
}>;


export type BulkUploadUsersMutation = { __typename?: 'Mutation', bulkUploadUsers: { __typename?: 'BulkUploadUsersPayload', success: boolean } };

export type CreateNewUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateNewUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserV2', role: UserRole, createdAt: string, password: string, id: string, firstName: string, lastName: string, email: string, username?: string | null } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUserById: { __typename?: 'UserV2', role: UserRole, createdAt: string, password: string, id: string, firstName: string, lastName: string, email: string, username?: string | null } };

export type UpdateUserAsAdminMutationVariables = Exact<{
  input: UpdateUserAsAdminInput;
}>;


export type UpdateUserAsAdminMutation = { __typename?: 'Mutation', updateUserAsAdmin: { __typename?: 'UpdatePayload', user: { __typename?: 'UserV2', role: UserRole, createdAt: string, password: string, id: string, firstName: string, lastName: string, email: string, username?: string | null } } };

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'DeleteAccountPayload', success: boolean } };

export type GetGeneratedAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGeneratedAccountQuery = { __typename?: 'Query', getGeneratedAccount: { __typename?: 'UserV2', username?: string | null, password: string } };

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

export type CreateWithdrawalRequestMutationVariables = Exact<{
  input: CreateWithdrawalRequestInput;
}>;


export type CreateWithdrawalRequestMutation = { __typename?: 'Mutation', createWithdrawalRequest: { __typename?: 'CreateWithdrawalRequestPayload', success: boolean, withdrawalRequest: { __typename?: 'WithdrawalRequest', id: string, amount: number, status: WithdrawalRequestStatus, payoutMethod: PaymentProvider, payoutAddress: string } } };

export type BasicAccountFragment = { __typename?: 'Account', id: string, email: string, balance: number, type: PaymentProvider, defaultAccount?: boolean | null, cashtag?: string | null, bitcoinAddress?: string | null, ethereumAddress?: string | null, name?: string | null };

export type BasicUserFragment = { __typename?: 'UserV2', id: string, firstName: string, lastName: string, email: string, username?: string | null };

export type EmailLogFragment = { __typename?: 'EmailLogV2', id: string, subject: string, body: string, receivedAt: string };

export type TransactionFragment = { __typename?: 'Transaction', id: string, amount: number, status: PaymentStatus, provider: PaymentProvider, paymentType: PaymentType, senderName: string };

export type UserFragment = { __typename?: 'UserV2', id: string, firstName: string, lastName: string, email: string, password: string, username?: string | null, role: UserRole, refreshToken?: string | null, supabaseId: string };

export type UserPaymentFragmentFragment = { __typename?: 'UserPayment', id: string, paymentIdentifier: string, paymentProvider: PaymentProvider, amount: number, processed: boolean, gameType: GameType, user?: { __typename?: 'UserV2', id: string, firstName: string, lastName: string, username?: string | null } | null };

export type WithdrawalRequestFragmentFragment = { __typename?: 'WithdrawalRequest', id: string, amount: number, status: WithdrawalRequestStatus, payoutMethod: PaymentProvider, payoutAddress: string };

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
export const EmailLogFragmentDoc = gql`
    fragment EmailLog on EmailLogV2 {
  id
  subject
  body
  receivedAt
}
    `;
export const TransactionFragmentDoc = gql`
    fragment Transaction on Transaction {
  id
  amount
  status
  provider
  paymentType
  senderName
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
export const UserPaymentFragmentFragmentDoc = gql`
    fragment UserPaymentFragment on UserPayment {
  id
  paymentIdentifier
  paymentProvider
  amount
  processed
  gameType
  user {
    id
    firstName
    lastName
    username
  }
}
    `;
export const WithdrawalRequestFragmentFragmentDoc = gql`
    fragment WithdrawalRequestFragment on WithdrawalRequest {
  id
  amount
  status
  payoutMethod
  payoutAddress
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
    updatedAt
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
export const MakeAccountDefaultDocument = gql`
    mutation MakeAccountDefault($id: String!) {
  makeAccountDefault(id: $id) {
    id
  }
}
    `;
export type MakeAccountDefaultMutationFn = Apollo.MutationFunction<MakeAccountDefaultMutation, MakeAccountDefaultMutationVariables>;

/**
 * __useMakeAccountDefaultMutation__
 *
 * To run a mutation, you first call `useMakeAccountDefaultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeAccountDefaultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeAccountDefaultMutation, { data, loading, error }] = useMakeAccountDefaultMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMakeAccountDefaultMutation(baseOptions?: Apollo.MutationHookOptions<MakeAccountDefaultMutation, MakeAccountDefaultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeAccountDefaultMutation, MakeAccountDefaultMutationVariables>(MakeAccountDefaultDocument, options);
      }
export type MakeAccountDefaultMutationHookResult = ReturnType<typeof useMakeAccountDefaultMutation>;
export type MakeAccountDefaultMutationResult = Apollo.MutationResult<MakeAccountDefaultMutation>;
export type MakeAccountDefaultMutationOptions = Apollo.BaseMutationOptions<MakeAccountDefaultMutation, MakeAccountDefaultMutationVariables>;
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
export const DeleteEmailLogDocument = gql`
    mutation DeleteEmailLog($id: String!) {
  deleteEmailLog(id: $id) {
    success
  }
}
    `;
export type DeleteEmailLogMutationFn = Apollo.MutationFunction<DeleteEmailLogMutation, DeleteEmailLogMutationVariables>;

/**
 * __useDeleteEmailLogMutation__
 *
 * To run a mutation, you first call `useDeleteEmailLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmailLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmailLogMutation, { data, loading, error }] = useDeleteEmailLogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEmailLogMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmailLogMutation, DeleteEmailLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmailLogMutation, DeleteEmailLogMutationVariables>(DeleteEmailLogDocument, options);
      }
export type DeleteEmailLogMutationHookResult = ReturnType<typeof useDeleteEmailLogMutation>;
export type DeleteEmailLogMutationResult = Apollo.MutationResult<DeleteEmailLogMutation>;
export type DeleteEmailLogMutationOptions = Apollo.BaseMutationOptions<DeleteEmailLogMutation, DeleteEmailLogMutationVariables>;
export const GetEmailLogsDocument = gql`
    query GetEmailLogs($input: GetAllEmailLogsInput = {hasTransactions: false}) {
  getAllEmailLogs(input: $input) {
    ...EmailLog
  }
}
    ${EmailLogFragmentDoc}`;

/**
 * __useGetEmailLogsQuery__
 *
 * To run a query within a React component, call `useGetEmailLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailLogsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEmailLogsQuery(baseOptions?: Apollo.QueryHookOptions<GetEmailLogsQuery, GetEmailLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailLogsQuery, GetEmailLogsQueryVariables>(GetEmailLogsDocument, options);
      }
export function useGetEmailLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmailLogsQuery, GetEmailLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailLogsQuery, GetEmailLogsQueryVariables>(GetEmailLogsDocument, options);
        }
export type GetEmailLogsQueryHookResult = ReturnType<typeof useGetEmailLogsQuery>;
export type GetEmailLogsLazyQueryHookResult = ReturnType<typeof useGetEmailLogsLazyQuery>;
export type GetEmailLogsQueryResult = Apollo.QueryResult<GetEmailLogsQuery, GetEmailLogsQueryVariables>;
export const UpdateTransactionStatusDocument = gql`
    mutation UpdateTransactionStatus($input: UpdateTransactionStatusInput!) {
  updateTransactionStatus(input: $input) {
    success
    transaction {
      ...Transaction
      createdAt
    }
  }
}
    ${TransactionFragmentDoc}`;
export type UpdateTransactionStatusMutationFn = Apollo.MutationFunction<UpdateTransactionStatusMutation, UpdateTransactionStatusMutationVariables>;

/**
 * __useUpdateTransactionStatusMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionStatusMutation, { data, loading, error }] = useUpdateTransactionStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTransactionStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTransactionStatusMutation, UpdateTransactionStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTransactionStatusMutation, UpdateTransactionStatusMutationVariables>(UpdateTransactionStatusDocument, options);
      }
export type UpdateTransactionStatusMutationHookResult = ReturnType<typeof useUpdateTransactionStatusMutation>;
export type UpdateTransactionStatusMutationResult = Apollo.MutationResult<UpdateTransactionStatusMutation>;
export type UpdateTransactionStatusMutationOptions = Apollo.BaseMutationOptions<UpdateTransactionStatusMutation, UpdateTransactionStatusMutationVariables>;
export const UpdateUserPaymentStatusDocument = gql`
    mutation UpdateUserPaymentStatus($input: UpdateUserPaymentStatusInput!) {
  updateUserPaymentStatus(input: $input) {
    success
    userPayment {
      ...UserPaymentFragment
      createdAt
    }
  }
}
    ${UserPaymentFragmentFragmentDoc}`;
export type UpdateUserPaymentStatusMutationFn = Apollo.MutationFunction<UpdateUserPaymentStatusMutation, UpdateUserPaymentStatusMutationVariables>;

/**
 * __useUpdateUserPaymentStatusMutation__
 *
 * To run a mutation, you first call `useUpdateUserPaymentStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPaymentStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPaymentStatusMutation, { data, loading, error }] = useUpdateUserPaymentStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserPaymentStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPaymentStatusMutation, UpdateUserPaymentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPaymentStatusMutation, UpdateUserPaymentStatusMutationVariables>(UpdateUserPaymentStatusDocument, options);
      }
export type UpdateUserPaymentStatusMutationHookResult = ReturnType<typeof useUpdateUserPaymentStatusMutation>;
export type UpdateUserPaymentStatusMutationResult = Apollo.MutationResult<UpdateUserPaymentStatusMutation>;
export type UpdateUserPaymentStatusMutationOptions = Apollo.BaseMutationOptions<UpdateUserPaymentStatusMutation, UpdateUserPaymentStatusMutationVariables>;
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    success
    transaction {
      ...Transaction
    }
  }
}
    ${TransactionFragmentDoc}`;
export type CreateTransactionMutationFn = Apollo.MutationFunction<CreateTransactionMutation, CreateTransactionMutationVariables>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument, options);
      }
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = Apollo.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = Apollo.BaseMutationOptions<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const DeleteTransactionDocument = gql`
    mutation DeleteTransaction($id: String!) {
  deleteTransaction(id: $id) {
    success
  }
}
    `;
export type DeleteTransactionMutationFn = Apollo.MutationFunction<DeleteTransactionMutation, DeleteTransactionMutationVariables>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTransactionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(DeleteTransactionDocument, options);
      }
export type DeleteTransactionMutationHookResult = ReturnType<typeof useDeleteTransactionMutation>;
export type DeleteTransactionMutationResult = Apollo.MutationResult<DeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = Apollo.BaseMutationOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const DeleteUserPaymentDocument = gql`
    mutation DeleteUserPayment($id: String!) {
  deleteUserPayment(id: $id) {
    success
  }
}
    `;
export type DeleteUserPaymentMutationFn = Apollo.MutationFunction<DeleteUserPaymentMutation, DeleteUserPaymentMutationVariables>;

/**
 * __useDeleteUserPaymentMutation__
 *
 * To run a mutation, you first call `useDeleteUserPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserPaymentMutation, { data, loading, error }] = useDeleteUserPaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserPaymentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserPaymentMutation, DeleteUserPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserPaymentMutation, DeleteUserPaymentMutationVariables>(DeleteUserPaymentDocument, options);
      }
export type DeleteUserPaymentMutationHookResult = ReturnType<typeof useDeleteUserPaymentMutation>;
export type DeleteUserPaymentMutationResult = Apollo.MutationResult<DeleteUserPaymentMutation>;
export type DeleteUserPaymentMutationOptions = Apollo.BaseMutationOptions<DeleteUserPaymentMutation, DeleteUserPaymentMutationVariables>;
export const GetWithdrawalRequestsDocument = gql`
    query GetWithdrawalRequests {
  getAllWithdrawalRequests {
    ...WithdrawalRequestFragment
    createdAt
  }
}
    ${WithdrawalRequestFragmentFragmentDoc}`;

/**
 * __useGetWithdrawalRequestsQuery__
 *
 * To run a query within a React component, call `useGetWithdrawalRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWithdrawalRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWithdrawalRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWithdrawalRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetWithdrawalRequestsQuery, GetWithdrawalRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWithdrawalRequestsQuery, GetWithdrawalRequestsQueryVariables>(GetWithdrawalRequestsDocument, options);
      }
export function useGetWithdrawalRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWithdrawalRequestsQuery, GetWithdrawalRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWithdrawalRequestsQuery, GetWithdrawalRequestsQueryVariables>(GetWithdrawalRequestsDocument, options);
        }
export type GetWithdrawalRequestsQueryHookResult = ReturnType<typeof useGetWithdrawalRequestsQuery>;
export type GetWithdrawalRequestsLazyQueryHookResult = ReturnType<typeof useGetWithdrawalRequestsLazyQuery>;
export type GetWithdrawalRequestsQueryResult = Apollo.QueryResult<GetWithdrawalRequestsQuery, GetWithdrawalRequestsQueryVariables>;
export const GetProcessedTransactionsDocument = gql`
    query GetProcessedTransactions($input: GetTransactionsInput = {status: COMPLETED}) {
  getAllTransactions(input: $input) {
    ...Transaction
    createdAt
  }
}
    ${TransactionFragmentDoc}`;

/**
 * __useGetProcessedTransactionsQuery__
 *
 * To run a query within a React component, call `useGetProcessedTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProcessedTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProcessedTransactionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProcessedTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetProcessedTransactionsQuery, GetProcessedTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProcessedTransactionsQuery, GetProcessedTransactionsQueryVariables>(GetProcessedTransactionsDocument, options);
      }
export function useGetProcessedTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProcessedTransactionsQuery, GetProcessedTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProcessedTransactionsQuery, GetProcessedTransactionsQueryVariables>(GetProcessedTransactionsDocument, options);
        }
export type GetProcessedTransactionsQueryHookResult = ReturnType<typeof useGetProcessedTransactionsQuery>;
export type GetProcessedTransactionsLazyQueryHookResult = ReturnType<typeof useGetProcessedTransactionsLazyQuery>;
export type GetProcessedTransactionsQueryResult = Apollo.QueryResult<GetProcessedTransactionsQuery, GetProcessedTransactionsQueryVariables>;
export const GetPendingTransactionsDocument = gql`
    query GetPendingTransactions($input: GetTransactionsInput = {status: PENDING}) {
  getAllTransactions(input: $input) {
    ...Transaction
    createdAt
  }
}
    ${TransactionFragmentDoc}`;

/**
 * __useGetPendingTransactionsQuery__
 *
 * To run a query within a React component, call `useGetPendingTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingTransactionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPendingTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetPendingTransactionsQuery, GetPendingTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPendingTransactionsQuery, GetPendingTransactionsQueryVariables>(GetPendingTransactionsDocument, options);
      }
export function useGetPendingTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingTransactionsQuery, GetPendingTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPendingTransactionsQuery, GetPendingTransactionsQueryVariables>(GetPendingTransactionsDocument, options);
        }
export type GetPendingTransactionsQueryHookResult = ReturnType<typeof useGetPendingTransactionsQuery>;
export type GetPendingTransactionsLazyQueryHookResult = ReturnType<typeof useGetPendingTransactionsLazyQuery>;
export type GetPendingTransactionsQueryResult = Apollo.QueryResult<GetPendingTransactionsQuery, GetPendingTransactionsQueryVariables>;
export const GetProcessedUserPaymentsDocument = gql`
    query GetProcessedUserPayments($input: GetUserPaymentsInput = {processed: true}) {
  getUserPayments(input: $input) {
    ...UserPaymentFragment
    createdAt
  }
}
    ${UserPaymentFragmentFragmentDoc}`;

/**
 * __useGetProcessedUserPaymentsQuery__
 *
 * To run a query within a React component, call `useGetProcessedUserPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProcessedUserPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProcessedUserPaymentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProcessedUserPaymentsQuery(baseOptions?: Apollo.QueryHookOptions<GetProcessedUserPaymentsQuery, GetProcessedUserPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProcessedUserPaymentsQuery, GetProcessedUserPaymentsQueryVariables>(GetProcessedUserPaymentsDocument, options);
      }
export function useGetProcessedUserPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProcessedUserPaymentsQuery, GetProcessedUserPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProcessedUserPaymentsQuery, GetProcessedUserPaymentsQueryVariables>(GetProcessedUserPaymentsDocument, options);
        }
export type GetProcessedUserPaymentsQueryHookResult = ReturnType<typeof useGetProcessedUserPaymentsQuery>;
export type GetProcessedUserPaymentsLazyQueryHookResult = ReturnType<typeof useGetProcessedUserPaymentsLazyQuery>;
export type GetProcessedUserPaymentsQueryResult = Apollo.QueryResult<GetProcessedUserPaymentsQuery, GetProcessedUserPaymentsQueryVariables>;
export const GetPendingUserPaymentsDocument = gql`
    query GetPendingUserPayments($input: GetUserPaymentsInput = {processed: false}) {
  getUserPayments(input: $input) {
    ...UserPaymentFragment
    createdAt
  }
}
    ${UserPaymentFragmentFragmentDoc}`;

/**
 * __useGetPendingUserPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPendingUserPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingUserPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingUserPaymentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPendingUserPaymentsQuery(baseOptions?: Apollo.QueryHookOptions<GetPendingUserPaymentsQuery, GetPendingUserPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPendingUserPaymentsQuery, GetPendingUserPaymentsQueryVariables>(GetPendingUserPaymentsDocument, options);
      }
export function useGetPendingUserPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingUserPaymentsQuery, GetPendingUserPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPendingUserPaymentsQuery, GetPendingUserPaymentsQueryVariables>(GetPendingUserPaymentsDocument, options);
        }
export type GetPendingUserPaymentsQueryHookResult = ReturnType<typeof useGetPendingUserPaymentsQuery>;
export type GetPendingUserPaymentsLazyQueryHookResult = ReturnType<typeof useGetPendingUserPaymentsLazyQuery>;
export type GetPendingUserPaymentsQueryResult = Apollo.QueryResult<GetPendingUserPaymentsQuery, GetPendingUserPaymentsQueryVariables>;
export const UpdateWithdrawalRequestStatusDocument = gql`
    mutation UpdateWithdrawalRequestStatus($input: UpdateWithdrawalRequestStatusInput!) {
  updateWithdrawalRequestStatus(input: $input) {
    success
    withdrawalRequest {
      ...WithdrawalRequestFragment
    }
  }
}
    ${WithdrawalRequestFragmentFragmentDoc}`;
export type UpdateWithdrawalRequestStatusMutationFn = Apollo.MutationFunction<UpdateWithdrawalRequestStatusMutation, UpdateWithdrawalRequestStatusMutationVariables>;

/**
 * __useUpdateWithdrawalRequestStatusMutation__
 *
 * To run a mutation, you first call `useUpdateWithdrawalRequestStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWithdrawalRequestStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWithdrawalRequestStatusMutation, { data, loading, error }] = useUpdateWithdrawalRequestStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWithdrawalRequestStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWithdrawalRequestStatusMutation, UpdateWithdrawalRequestStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWithdrawalRequestStatusMutation, UpdateWithdrawalRequestStatusMutationVariables>(UpdateWithdrawalRequestStatusDocument, options);
      }
export type UpdateWithdrawalRequestStatusMutationHookResult = ReturnType<typeof useUpdateWithdrawalRequestStatusMutation>;
export type UpdateWithdrawalRequestStatusMutationResult = Apollo.MutationResult<UpdateWithdrawalRequestStatusMutation>;
export type UpdateWithdrawalRequestStatusMutationOptions = Apollo.BaseMutationOptions<UpdateWithdrawalRequestStatusMutation, UpdateWithdrawalRequestStatusMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: String!) {
  deleteUser(id: $id) {
    success
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getAllUsers {
    ...BasicUser
    role
    createdAt
  }
}
    ${BasicUserFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetGeneratedAccountCountDocument = gql`
    query GetGeneratedAccountCount {
  getGeneratedAccountCount {
    count
  }
}
    `;

/**
 * __useGetGeneratedAccountCountQuery__
 *
 * To run a query within a React component, call `useGetGeneratedAccountCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGeneratedAccountCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGeneratedAccountCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGeneratedAccountCountQuery(baseOptions?: Apollo.QueryHookOptions<GetGeneratedAccountCountQuery, GetGeneratedAccountCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGeneratedAccountCountQuery, GetGeneratedAccountCountQueryVariables>(GetGeneratedAccountCountDocument, options);
      }
export function useGetGeneratedAccountCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGeneratedAccountCountQuery, GetGeneratedAccountCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGeneratedAccountCountQuery, GetGeneratedAccountCountQueryVariables>(GetGeneratedAccountCountDocument, options);
        }
export type GetGeneratedAccountCountQueryHookResult = ReturnType<typeof useGetGeneratedAccountCountQuery>;
export type GetGeneratedAccountCountLazyQueryHookResult = ReturnType<typeof useGetGeneratedAccountCountLazyQuery>;
export type GetGeneratedAccountCountQueryResult = Apollo.QueryResult<GetGeneratedAccountCountQuery, GetGeneratedAccountCountQueryVariables>;
export const BulkUploadUsersDocument = gql`
    mutation BulkUploadUsers($input: BulkUploadUsersInput!) {
  bulkUploadUsers(input: $input) {
    success
  }
}
    `;
export type BulkUploadUsersMutationFn = Apollo.MutationFunction<BulkUploadUsersMutation, BulkUploadUsersMutationVariables>;

/**
 * __useBulkUploadUsersMutation__
 *
 * To run a mutation, you first call `useBulkUploadUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkUploadUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkUploadUsersMutation, { data, loading, error }] = useBulkUploadUsersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkUploadUsersMutation(baseOptions?: Apollo.MutationHookOptions<BulkUploadUsersMutation, BulkUploadUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkUploadUsersMutation, BulkUploadUsersMutationVariables>(BulkUploadUsersDocument, options);
      }
export type BulkUploadUsersMutationHookResult = ReturnType<typeof useBulkUploadUsersMutation>;
export type BulkUploadUsersMutationResult = Apollo.MutationResult<BulkUploadUsersMutation>;
export type BulkUploadUsersMutationOptions = Apollo.BaseMutationOptions<BulkUploadUsersMutation, BulkUploadUsersMutationVariables>;
export const CreateNewUserDocument = gql`
    mutation CreateNewUser($input: CreateUserInput!) {
  createUser(input: $input) {
    ...BasicUser
    role
    createdAt
    password
  }
}
    ${BasicUserFragmentDoc}`;
export type CreateNewUserMutationFn = Apollo.MutationFunction<CreateNewUserMutation, CreateNewUserMutationVariables>;

/**
 * __useCreateNewUserMutation__
 *
 * To run a mutation, you first call `useCreateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewUserMutation, { data, loading, error }] = useCreateNewUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNewUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewUserMutation, CreateNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewUserMutation, CreateNewUserMutationVariables>(CreateNewUserDocument, options);
      }
export type CreateNewUserMutationHookResult = ReturnType<typeof useCreateNewUserMutation>;
export type CreateNewUserMutationResult = Apollo.MutationResult<CreateNewUserMutation>;
export type CreateNewUserMutationOptions = Apollo.BaseMutationOptions<CreateNewUserMutation, CreateNewUserMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  getUserById(id: $id) {
    ...BasicUser
    role
    createdAt
    password
  }
}
    ${BasicUserFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const UpdateUserAsAdminDocument = gql`
    mutation UpdateUserAsAdmin($input: UpdateUserAsAdminInput!) {
  updateUserAsAdmin(input: $input) {
    user {
      ...BasicUser
      role
      createdAt
      password
    }
  }
}
    ${BasicUserFragmentDoc}`;
export type UpdateUserAsAdminMutationFn = Apollo.MutationFunction<UpdateUserAsAdminMutation, UpdateUserAsAdminMutationVariables>;

/**
 * __useUpdateUserAsAdminMutation__
 *
 * To run a mutation, you first call `useUpdateUserAsAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAsAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAsAdminMutation, { data, loading, error }] = useUpdateUserAsAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserAsAdminMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAsAdminMutation, UpdateUserAsAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAsAdminMutation, UpdateUserAsAdminMutationVariables>(UpdateUserAsAdminDocument, options);
      }
export type UpdateUserAsAdminMutationHookResult = ReturnType<typeof useUpdateUserAsAdminMutation>;
export type UpdateUserAsAdminMutationResult = Apollo.MutationResult<UpdateUserAsAdminMutation>;
export type UpdateUserAsAdminMutationOptions = Apollo.BaseMutationOptions<UpdateUserAsAdminMutation, UpdateUserAsAdminMutationVariables>;
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
export const GetGeneratedAccountDocument = gql`
    query GetGeneratedAccount {
  getGeneratedAccount {
    username
    password
  }
}
    `;

/**
 * __useGetGeneratedAccountQuery__
 *
 * To run a query within a React component, call `useGetGeneratedAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGeneratedAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGeneratedAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGeneratedAccountQuery(baseOptions?: Apollo.QueryHookOptions<GetGeneratedAccountQuery, GetGeneratedAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGeneratedAccountQuery, GetGeneratedAccountQueryVariables>(GetGeneratedAccountDocument, options);
      }
export function useGetGeneratedAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGeneratedAccountQuery, GetGeneratedAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGeneratedAccountQuery, GetGeneratedAccountQueryVariables>(GetGeneratedAccountDocument, options);
        }
export type GetGeneratedAccountQueryHookResult = ReturnType<typeof useGetGeneratedAccountQuery>;
export type GetGeneratedAccountLazyQueryHookResult = ReturnType<typeof useGetGeneratedAccountLazyQuery>;
export type GetGeneratedAccountQueryResult = Apollo.QueryResult<GetGeneratedAccountQuery, GetGeneratedAccountQueryVariables>;
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
export const CreateWithdrawalRequestDocument = gql`
    mutation CreateWithdrawalRequest($input: CreateWithdrawalRequestInput!) {
  createWithdrawalRequest(input: $input) {
    success
    withdrawalRequest {
      ...WithdrawalRequestFragment
    }
  }
}
    ${WithdrawalRequestFragmentFragmentDoc}`;
export type CreateWithdrawalRequestMutationFn = Apollo.MutationFunction<CreateWithdrawalRequestMutation, CreateWithdrawalRequestMutationVariables>;

/**
 * __useCreateWithdrawalRequestMutation__
 *
 * To run a mutation, you first call `useCreateWithdrawalRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWithdrawalRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWithdrawalRequestMutation, { data, loading, error }] = useCreateWithdrawalRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWithdrawalRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateWithdrawalRequestMutation, CreateWithdrawalRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWithdrawalRequestMutation, CreateWithdrawalRequestMutationVariables>(CreateWithdrawalRequestDocument, options);
      }
export type CreateWithdrawalRequestMutationHookResult = ReturnType<typeof useCreateWithdrawalRequestMutation>;
export type CreateWithdrawalRequestMutationResult = Apollo.MutationResult<CreateWithdrawalRequestMutation>;
export type CreateWithdrawalRequestMutationOptions = Apollo.BaseMutationOptions<CreateWithdrawalRequestMutation, CreateWithdrawalRequestMutationVariables>;
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