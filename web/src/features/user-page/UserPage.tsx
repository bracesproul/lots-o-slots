import React, { FormEvent, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { InitialFormValues, StylePrefix, UserInfoFormData } from '@/types';
import { Button, Input } from '@/components';
import { useRouter } from 'next/router';
import { useValidatePassword } from '@/hooks';
import {
  useGetUserDataQuery,
  UserRole,
  useUpdateUserDataMutation,
} from '@/generated/graphql';

export type UserPageProps = {
  /** Optional style prop for overriding the default styles. */
  className?: string;
  /** Whether or not the submit and inputs are disabled */
  isDisabled?: boolean;
  /** State variables and setter function for controlling inputs */
  formData: UserInfoFormData;
  /** Submit handler for creating an account */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  /** Event handler for checking if a user has focused and exited an input */
  setFocusExit: (e: boolean) => void;
  /** Message to display when a password is invalid */
  invalidPasswordMessage?: string;
  /** The initial values to populate the form with */
  initialFormValues: InitialFormValues;
  /** Whether or not the save button is disabled. */
  isSaveDisabled: boolean;
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

  const handleLogout = async () => {
    await router.push('/logout');
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
          <form
            onSubmit={(e) => p.handleSubmit(e)}
            className={`${PREFIX}-link-form`}
          >
            <div className={`${PREFIX}-instructions`}>
              <h1 className={`${PREFIX}-heading`}>Account</h1>
            </div>
            <div className={`${PREFIX}-fields`}>
              <Input
                type="text"
                value={
                  firstName === '' ? p.initialFormValues?.firstName : firstName
                }
                onChange={setFirstName}
                label="First Name"
                isDisabled={p.isDisabled}
                className={`${PREFIX}-normal-input`}
                labelClassName={`${PREFIX}-input-label`}
                autoComplete="off"
              />
              <Input
                type="text"
                value={
                  lastName === '' ? p.initialFormValues?.lastName : lastName
                }
                onChange={setLastName}
                label="Last Name"
                isDisabled={p.isDisabled}
                className={`${PREFIX}-normal-input`}
                labelClassName={`${PREFIX}-input-label`}
                autoComplete="off"
              />
              <Input
                type="text"
                value={email === '' ? p.initialFormValues?.email : email}
                onChange={setEmail}
                label="Email"
                className={`${PREFIX}-normal-input`}
                labelClassName={`${PREFIX}-input-label`}
                isDisabled={p.isDisabled}
                required
                autoComplete="off"
              />
              <Input
                type="password"
                required
                value={
                  password === '' ? p.initialFormValues?.password : password
                }
                onChange={setPassword}
                label="Password"
                className={`${PREFIX}-normal-input`}
                labelClassName={`${PREFIX}-input-label`}
                error={p.invalidPasswordMessage}
                isDisabled={p.isDisabled}
                handleOnBlur={() => {
                  p.setFocusExit(true);
                }}
                showTogglePasswordIcon
                autoComplete="new-password"
              />
              {p.invalidPasswordMessage && (
                <p className={`${PREFIX}-error-message`}>
                  {p.invalidPasswordMessage}
                </p>
              )}
              <Input
                type="text"
                value={
                  username === '' ? p.initialFormValues?.username : username
                }
                onChange={setUsername}
                label="Poker/Slots Username"
                isDisabled={p.isDisabled}
                className={`${PREFIX}-normal-input`}
                labelClassName={`${PREFIX}-input-label`}
                autoComplete="off"
              />
              <div>
                <Button
                  type="submit"
                  isDisabled={p.isSaveDisabled}
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
  const { data, error } = useGetUserDataQuery();
  const userData = data?.getUserBySupabaseId;
  const initialFormValues = {
    username: userData?.username || '',
    password: userData?.password || '',
    email: userData?.email || '',
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { setFocusExit, invalidPasswordMessage } = useValidatePassword({
    password,
  });
  const [updateUserData] = useUpdateUserDataMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserData({
      variables: {
        input: {
          supabaseId: userData?.supabaseId || '',
          password: password === '' ? initialFormValues.password : password,
          email: email === '' ? initialFormValues.email : email,
          data: {
            username: username === '' ? initialFormValues.username : username,
            firstName:
              firstName === '' ? initialFormValues.firstName : firstName,
            lastName: lastName === '' ? initialFormValues.lastName : lastName,
            role: UserRole.USER,
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateUser: {
          __typename: 'UpdatePayload',
          success: true,
          user: {
            __typename: 'UserV2',
            id: 'string',
            firstName,
            lastName,
            email,
            password,
            username,
          },
        },
      },
    });
  };

  const isSaveDisabled =
    (!password && !email && !firstName && !lastName) ||
    (initialFormValues.username === username &&
      initialFormValues.password === password &&
      initialFormValues.email === email &&
      initialFormValues.firstName === firstName &&
      initialFormValues.lastName === lastName);

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
      isSaveDisabled={isSaveDisabled}
    />
  );
}
