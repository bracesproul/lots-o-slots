import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { SIGN_UP_PAGE, StylePrefix } from '@/types';
import { Button, Input } from '@/components';
import Link from 'next/link';

export type LoginPageProps = {
  /** Optional style prop for overriding the default styles. */
  className?: string;
  /** State variable for the username */
  username: string;
  /** State setter for controlling the username */
  setUsername: (username: string) => void;
  /** State variable for the password */
  password: string;
  /** State setter for controlling the password */
  setPassword: (password: string) => void;
  /** Whether or not the submit and inputs are disabled */
  isDisabled?: boolean;
};

const PREFIX = StylePrefix.LOGIN_PAGE;

function LoginPage(props: LoginPageProps): ReactElement {
  const p = { ...props };

  const isSubmitDisabled = p.isDisabled || !p.username || !p.password;

  return (
    <div className={clsx([PREFIX, props.className])}>
      <div className={`${PREFIX}-wrapper`}>
        <h3 className={`${PREFIX}-title`}>Login</h3>
        <form className={`${PREFIX}-form`}>
          <Input
            type="text"
            required
            value={p.username}
            onChange={p.setUsername}
            label="Username"
            isDisabled={p.isDisabled}
            className={`${PREFIX}-normal-input`}
          />
          <Input
            type="text"
            required
            value={p.password}
            onChange={p.setPassword}
            label="Password"
            isDisabled={p.isDisabled}
            className={`${PREFIX}-normal-input`}
          />
          <p className={`${PREFIX}-sign-up`}><Link href={SIGN_UP_PAGE}>Don't have an account? Sign up now</Link></p>
          <Button isDisabled={isSubmitDisabled} type='submit' className={`${PREFIX}-submit-button`}>Login</Button>
        </form>
      </div>
    </div>
  )
}

export default function LoginPageContainer(): ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = false;

  return <LoginPage
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    isDisabled={isDisabled}
  />;
}
