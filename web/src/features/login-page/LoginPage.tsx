import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { AuthStep, SIGN_UP_PAGE, StylePrefix } from '@/types';
import { Button, Input } from '@/components';
import Link from 'next/link';

type LoginFormData = {
  /** State variable for the username */
  username: string;
  /** State setter for controlling the username */
  setUsername: (username: string) => void;
  /** State variable for the password */
  password: string;
  /** State setter for controlling the password */
  setPassword: (password: string) => void;
}

export type LoginPageProps = {
  /** Optional style prop for overriding the default styles. */
  className?: string;
  /** Whether or not the submit and inputs are disabled */
  isDisabled?: boolean;
  /** State variables and setter functions for the form fields */
  formData: LoginFormData;
  /** Submit handler for creating an account */
  handleSubmit: () => void;
};

const PREFIX = StylePrefix.LOGIN_PAGE;

function LoginPage2(props: LoginPageProps): ReactElement {
  const p = { ...props };
  const {
    username,
    setUsername,
    password,
    setPassword,
  } = p.formData;
  const isSubmitDisabled = p.isDisabled || !username || !password;

  const [step, setStep] = useState(AuthStep.ENTER_INFO)

  const handleSubmit = () => {
    setStep(AuthStep.PROCESSING)
    p.handleSubmit();
  }

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
                  <h1 className={`${PREFIX}-heading`}>Login</h1>
                </div>

                <div className={`${PREFIX}-fields`}>
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
                  <p className={`${PREFIX}-login`}><Link href={SIGN_UP_PAGE}>Don't have an account? Sign up now</Link></p>
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
                </div>
              </form>
            </div>
          )}
          {step === AuthStep.PROCESSING && (
            <div className={`${PREFIX}-processing-body`}>
              <h1>Logging in, please wait.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LoginPageContainer(): ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = false;

  const handleSubmit = () => {
    /** @TODO call api */
  }

  return <LoginPage2
    formData={{
      username,
      setUsername,
      password,
      setPassword,
    }}
    isDisabled={isDisabled}
    handleSubmit={handleSubmit}
  />;
}
