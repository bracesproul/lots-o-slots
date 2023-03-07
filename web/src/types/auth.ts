export enum AuthStep {
  ENTER_INFO = 'enter-info',
  PROCESSING = 'processing',
}

export enum LoginError {
  INVALID_CREDENTIALS = 'Invalid username and/or password',
  ERROR = 'Something went wrong. Please try again later',
}

export enum SignUpError {
  ACCOUNT_EXISTS = 'It looks like you already have an account. Try logging in instead?',
  INVALID_PASSWORD = 'Please enter a valid password',
  ERROR = 'Something went wrong. Please try again later',
}
