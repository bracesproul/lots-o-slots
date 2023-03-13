import React, { ReactElement, useEffect, useState } from 'react';
import clsx from 'clsx';
import { StylePrefix, UserInfoFormData } from '@/types';
import { Button, Input } from '@/components';
import { useRouter } from 'next/router';
import { useValidatePassword } from '@/hooks';
import { useGetUserDataQuery } from '@/generated/graphql';
import { useUser } from '@supabase/auth-helpers-react';

export type InitialFormValues = Pick<
  UserInfoFormData,
  'firstName' | 'lastName' | 'username' | 'email' | 'password'
>;

export type UserPageProps = {
  /** Optional style prop for overriding the default styles. */
  className?: string;
  /** Whether or not the submit and inputs are disabled */
  isDisabled?: boolean;
  /** State variables and setter function for controlling inputs */
  formData: UserInfoFormData;
  /** Submit handler for creating an account */
  handleSubmit: () => void;
  /** Event handler for checking if a user has focused and exited an input */
  setFocusExit: (e: boolean) => void;
  /** Message to display when a password is invalid */
  invalidPasswordMessage?: string;
  /** The initial values to populate the form with */
  initialFormValues: InitialFormValues;
};

const PREFIX = StylePrefix.USER_PAGE;

function UserPage(props: UserPageProps): ReactElement {
  const p = { ...props };
  const router = useRouter();
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

  const handleSubmit = () => {
    // @todo: implement
  };

  const handleLogout = () => {
    router.push('/logout');
  };

  return (
    <div className={clsx(`${PREFIX}`)}>
      <div className={`${PREFIX}-actions-header`}>
        <Button onPress={handleLogout} className={`${PREFIX}-logout-button`}>
          Logout
        </Button>
      </div>
      <div className={`${PREFIX}-content`}>
        <div className={`${PREFIX}-card`}>
          <form onSubmit={handleSubmit} className={`${PREFIX}-link-form`}>
            <div className={`${PREFIX}-instructions`}>
              <h1 className={`${PREFIX}-heading`}>Account</h1>
            </div>
            <div className={`${PREFIX}-fields`}>
              <Input
                type="text"
                value={firstName}
                onChange={setFirstName}
                label="First Name"
                isDisabled={p.isDisabled}
                className={`${PREFIX}-normal-input`}
                labelClassName={`${PREFIX}-input-label`}
              />
              <Input
                type="text"
                value={lastName}
                onChange={setLastName}
                label="Last Name"
                isDisabled={p.isDisabled}
                className={`${PREFIX}-normal-input`}
                labelClassName={`${PREFIX}-input-label`}
              />
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
                type="password"
                required
                value={password}
                onChange={setPassword}
                label="Password"
                className={`${PREFIX}-normal-input`}
                labelClassName={`${PREFIX}-input-label`}
                error={p.invalidPasswordMessage}
                handleOnBlur={() => {
                  p.setFocusExit(true);
                }}
                showTogglePasswordIcon
              />
              {p.invalidPasswordMessage && (
                <p className={`${PREFIX}-error-message`}>
                  {p.invalidPasswordMessage}
                </p>
              )}
              <Input
                type="text"
                value={email}
                onChange={setEmail}
                label="Email"
                className={`${PREFIX}-normal-input`}
                labelClassName={`${PREFIX}-input-label`}
                required
              />
              <div>
                <Button
                  type="submit"
                  isDisabled={p.isDisabled}
                  variant="primary"
                  className={`${PREFIX}-submit-button`}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function UserPageContainer(): ReactElement {
  const user = useUser();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { setFocusExit, invalidPasswordMessage } = useValidatePassword({
    password,
  });

  useEffect(() => {
    if (router.isReady) {
      router.replace('/user', undefined, { shallow: true });
    }
  }, [router]);

  const handleSubmit = () => {
    // @todo: implement
  };

  const initialUsername = 'my_username';
  const initialPassword = 'my_password';
  const initialEmail = 'my_email';
  const initialFirstName = 'my_first_name';
  const initialLastName = 'my_last_name';

  const initialFormValues = {
    username: initialUsername,
    password: initialPassword,
    email: initialEmail,
    firstName: initialFirstName,
    lastName: initialLastName,
  };

  return (
    <UserPage
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
      setFocusExit={setFocusExit}
      handleSubmit={handleSubmit}
      invalidPasswordMessage={invalidPasswordMessage}
      initialFormValues={initialFormValues}
    />
  );
}
