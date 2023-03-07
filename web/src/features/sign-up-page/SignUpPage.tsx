import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { AuthStep, LOGIN_PAGE, SignUpError, StylePrefix } from '@/types';
import { Button, Input } from '@/components';
import Link from 'next/link';
import { validatePassword } from './utils';

type SignUpFormData = {
  /** State variable for the username */
  username: string;
  /** State setter for controlling the username */
  setUsername: (username: string) => void;
  /** State variable for the password */
  password: string;
  /** State setter for controlling the password */
  setPassword: (password: string) => void;
  /** State variable for the email */
  email: string;
  /** State setter for controlling the email */
  setEmail: (email: string) => void;
  /** State variable for the users first name */
  firstName: string;
  /** State setter for controlling the users first name */
  setFirstName: (firstName: string) => void;
  /** State variable for the users last name */
  lastName: string;
  /** State setter for controlling the users last name */
  setLastName: (lastName: string) => void;
}

export type SignUpPageProps = {
  /** Optional style prop for overriding the default styles. */
  className?: string;
  /** Whether or not the submit and inputs are disabled */
  isDisabled?: boolean;
  /** State variables and setter function for controlling inputs */
  formData: SignUpFormData;
  /** Submit handler for creating an account */
  handleSubmit: () => void;
  /** A list of errors */
  errorMessages?: SignUpError[];
};

const PREFIX = StylePrefix.SIGN_UP_PAGE;

function SignUpPage(props: SignUpPageProps): ReactElement {
  const p = { ...props };
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
  } = p.formData;

  const [step, setStep] = useState(AuthStep.ENTER_INFO)
  const isSubmitDisabled = p.isDisabled || !username || !password || !firstName || !lastName;

  const handleSubmit = () => {
    setStep(AuthStep.PROCESSING)
    p.handleSubmit();
  }

  const accountExistsError = p.errorMessages?.includes(SignUpError.ACCOUNT_EXISTS) ? p.errorMessages.find((e) => e === SignUpError.ACCOUNT_EXISTS) : undefined;
  const invalidPasswordError = p.errorMessages?.includes(SignUpError.INVALID_PASSWORD) ? p.errorMessages.find((e) => e === SignUpError.INVALID_PASSWORD) : undefined;
  const generalError = p.errorMessages?.includes(SignUpError.ERROR) ? p.errorMessages.find((e) => e === SignUpError.ERROR) : undefined;

  const invalidPasswordMessage = 'Invalid Password, passwords must include two numbers, one uppercase and lowercase letter and no spaces.'

  return (
    <div
      className={clsx(
        `${PREFIX}`,
      )}
    >
      <div className={`${PREFIX}-content`}>
        <div className={`${PREFIX}-body`}>
          {step === AuthStep.ENTER_INFO && (
            <div className={`${PREFIX}-card`}>
              <form onSubmit={handleSubmit} className={`${PREFIX}-link-form`}>
                <div className={`${PREFIX}-instructions`}>
                  <h1 className={`${PREFIX}-heading`}>Sign Up</h1>
                </div>

                <div className={`${PREFIX}-fields`}>
                  <div className={`${PREFIX}-side-by-side-fields`}>
                    <Input
                      type="text"
                      required
                      value={firstName}
                      onChange={setFirstName}
                      label="First Name"
                      isDisabled={p.isDisabled}
                      className={`${PREFIX}-small-input`}
                      labelClassName={`${PREFIX}-input-label`}
                    />
                    <Input
                      type="text"
                      required
                      value={lastName}
                      onChange={setLastName}
                      label="Last Name"
                      isDisabled={p.isDisabled}
                      className={`${PREFIX}-small-input`}
                      labelClassName={`${PREFIX}-input-label`}
                    />
                  </div>
                  <Input
                    type="text"
                    value={username}
                    onChange={setUsername}
                    label="Poker/Slots Username"
                    isDisabled={p.isDisabled}
                    className={`${PREFIX}-normal-input`}
                    labelClassName={`${PREFIX}-input-label`}
                  />
                  <Input
                    type="text"
                    required
                    value={password}
                    onChange={setPassword}
                    label="Password"
                    isDisabled={p.isDisabled}
                    className={`${PREFIX}-normal-input`}
                    labelClassName={`${PREFIX}-input-label`}
                    error={invalidPasswordError}
                  />
                  {invalidPasswordError && <p className={`${PREFIX}-error-message`}>{invalidPasswordMessage}</p>}
                  <Input
                    type="text"
                    value={email}
                    onChange={setEmail}
                    label="Email"
                    isDisabled={p.isDisabled}
                    className={`${PREFIX}-normal-input`}
                    labelClassName={`${PREFIX}-input-label`}
                    required
                  />
                  <p className={`${PREFIX}-login`}><Link href={LOGIN_PAGE}>Already have an account? Login now</Link></p>
                  <div>
                    <Button
                      type="submit"
                      isDisabled={isSubmitDisabled}
                      variant="primary"
                      className={`${PREFIX}-submit-button`}
                    >
                      Submit
                    </Button>
                  </div>
                  {
                    generalError ? 
                      <p className={`${PREFIX}-error-message`}>{generalError}</p>
                      : accountExistsError
                      ? <p className={clsx(`${PREFIX}-error-message`, {
                        'is-link': true
                      })}><Link href={LOGIN_PAGE}>{accountExistsError}</Link></p>
                      : <></>
                  }
                </div>
              </form>
            </div>
          )}
          {step === AuthStep.PROCESSING && (
            <div className={`${PREFIX}-processing-body`}>
              <h1>Please wait while your account is created.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SignUpPageContainer(): ReactElement {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignUpError[] | undefined>(undefined);

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    if (!validatePassword(password) && password !== '') {
      if (!errors?.includes(SignUpError.INVALID_PASSWORD)) {
        setErrors((prev) => [...(prev ? prev : []), SignUpError.INVALID_PASSWORD])
      }
    } else if (password === '') {
      setErrors((prev) => prev?.filter((e) => e !== SignUpError.INVALID_PASSWORD))
    }
  }

  const isDisabled = false;

  const handleSubmit = () => {
    /** @TODO call api */
  }

  return <SignUpPage
    isDisabled={isDisabled}
    handleSubmit={handleSubmit}
    errorMessages={errors}
    formData={{
      username,
      setUsername,
      password,
      setPassword: handlePasswordChange,
      email,
      setEmail,
      firstName,
      setFirstName,
      lastName,
      setLastName,
    }}
  />;
}
