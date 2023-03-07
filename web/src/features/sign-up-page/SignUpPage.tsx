import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { LOGIN_PAGE, StylePrefix } from '@/types';
import { Button, Input } from '@/components';
import Link from 'next/link';

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
  formData: SignUpFormData;
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
  const isSubmitDisabled = p.isDisabled || !username || !password || !firstName || !lastName;

  return (
    <div className={clsx([PREFIX, props.className])}>
      <div className={`${PREFIX}-wrapper`}>
        <h3 className={`${PREFIX}-title`}>Sign Up</h3>
        <form className={`${PREFIX}-form`}>
          <div className={`${PREFIX}-side-by-side-fields`}>
            <Input
              type="text"
              required
              value={firstName}
              onChange={setFirstName}
              label="First Name"
              isDisabled={p.isDisabled}
              className={`${PREFIX}-small-input`}
            />
            <Input
              type="text"
              required
              value={lastName}
              onChange={setLastName}
              label="Last Name"
              isDisabled={p.isDisabled}
              className={`${PREFIX}-small-input`}
            />
          </div>
          <Input
            type="text"
            required
            value={username}
            onChange={setUsername}
            label="Username"
            isDisabled={p.isDisabled}
            className={`${PREFIX}-normal-input`}
          />
          <Input
            type="text"
            required
            value={password}
            onChange={setPassword}
            label="Password"
            isDisabled={p.isDisabled}
            className={`${PREFIX}-normal-input`}
          />
          <Input
            type="text"
            required
            value={email}
            onChange={setEmail}
            label="Email"
            isDisabled={p.isDisabled}
            className={`${PREFIX}-normal-input`}
          />
          <p className={`${PREFIX}-login`}><Link href={LOGIN_PAGE}>Already have an account? Login now</Link></p>
          <Button isDisabled={isSubmitDisabled} type='submit' className={`${PREFIX}-submit-button`}>Sign Up</Button>
        </form>
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

  const isDisabled = false;

  return <SignUpPage2
    isDisabled={isDisabled}
    formData={{
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
    }}
  />;
}

enum SignUpStep {
  ENTER_INFO = 'enter-info',
  PROCESSING = 'processing',
}

function SignUpPage2(props: SignUpPageProps): ReactElement {
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

  const [step, setStep] = useState(SignUpStep.ENTER_INFO)
  const isSubmitDisabled = p.isDisabled || !username || !password || !firstName || !lastName;

  const handleSubmit = () => {
    // todo implement
  }




  return (
    <div
      className={clsx(
        `${PREFIX}`,
      )}
    >
      <div className={`${PREFIX}-content`}>
        <div className={`${PREFIX}-body`}>
          {step === SignUpStep.ENTER_INFO && (
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
                    required
                    value={username}
                    onChange={setUsername}
                    label="Username"
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
                  />
                  <Input
                    type="text"
                    required
                    value={email}
                    onChange={setEmail}
                    label="Email"
                    isDisabled={p.isDisabled}
                    className={`${PREFIX}-normal-input`}
                    labelClassName={`${PREFIX}-input-label`}
                  />
                  <div>
                    <Button
                      type="submit"
                      isDisabled={isSubmitDisabled}
                      variant="primary"
                      className={`${PREFIX}-submit-button`}
                      labelClassName={`${PREFIX}-input-label`}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
