import { Input, Button, Checkbox } from '@/components';
import { StylePrefix } from '@/types';
import clsx from 'clsx';
import React from 'react';
import { FormEvent, ReactElement, useState } from 'react';
import {
  useGetUserQuery,
  UserRole,
  useCreateNewUserMutation,
  useUpdateUserAsAdminMutation,
} from '@/generated/graphql';
import useEditUserQueryParams from '../../useEditUserQueryParams';
import { UserInfoFormData, InitialFormValues } from '@/types';
import { getUserFromUserQuery } from '../../utils';
import passwordGenerator from 'generate-password';

const PREFIX = StylePrefix.USER_FORM;

type FormData = Omit<UserInfoFormData, 'password' | 'setPassword'> & {
  /** Whether or not the user is an admin. */
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
};

type InitialFormData = Omit<InitialFormValues, 'password'> & {
  /** Whether or not the user is an admin. */
  isAdmin?: boolean;
};

export type UserFormProps = {
  /** Optional className to override default styles. */
  className?: string;
  /** Form data */
  formData: FormData;
  /** Initial values to populate the form with, will be undefined if it's a new account */
  initialFormValues: InitialFormData;
  /** Submit handler for updating/creating an account */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  /** Whether or not the form fields are disabled */
  isDisabled: boolean;
  /** Whether or not the submit button should be disabled */
  isSubmitDisabled: boolean;
  /** Handler for clearing the form and query params */
  handleClearForm: () => void;
  /** What step of the account creation process the admin is on */
  step: CreateUserStep;
  /** Handler for setting the step. */
  setStep: (step: CreateUserStep) => void;
  /** The generated password for the new user */
  password: string;
};

const DEFAULT_PROPS = {
  // add default props
};

function UserForm(props: UserFormProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    isAdmin,
    setIsAdmin,
  } = p.formData;

  return (
    <div className={clsx(PREFIX, p.className)}>
      {p.step === CreateUserStep.USER_INFO && (
        <form onSubmit={(e) => p.handleSubmit(e)}>
          <div className={`${PREFIX}-instructions`}>
            <h1 className={`${PREFIX}-heading`}>Add/Edit Account</h1>
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
              value={lastName === '' ? p.initialFormValues?.lastName : lastName}
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
              type="text"
              value={username === '' ? p.initialFormValues?.username : username}
              onChange={setUsername}
              label="Poker/Slots Username"
              isDisabled={p.isDisabled}
              className={`${PREFIX}-normal-input`}
              labelClassName={`${PREFIX}-input-label`}
              autoComplete="off"
            />
            <Checkbox
              label="Admin"
              checked={
                p.initialFormValues?.isAdmin
                  ? p.initialFormValues.isAdmin
                  : isAdmin
              }
              onCheckedChange={(e: any) => {
                if (typeof e === 'boolean') {
                  setIsAdmin(!isAdmin);
                }
              }}
              className={`${PREFIX}-checkbox`}
            />
            <div className="flex flex-row gap-[8px]">
              <Button
                type="button"
                isDisabled={p.isSubmitDisabled}
                variant="secondary"
                className={`${PREFIX}-submit-button text-black`}
                onPress={p.handleClearForm}
              >
                Clear form
              </Button>
              <Button
                type="submit"
                isDisabled={p.isSubmitDisabled}
                variant="primary"
                className={`${PREFIX}-submit-button`}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      )}
      {p.step === CreateUserStep.ACCOUNT_CREATED && (
        <div className={`${PREFIX}-account-created`}>
          <p className={`${PREFIX}-account-created-heading`}>Account created</p>
          <div className={`${PREFIX}-account-info`}>
            <p className={`${PREFIX}-account-info-label`}>Email:</p>
            <p className={`${PREFIX}-account-info-value`}>{email}</p>
          </div>
          <div className={`${PREFIX}-account-info`}>
            <p className={`${PREFIX}-account-info-label`}>Password:</p>
            <p className={`${PREFIX}-account-info-value`}>{p.password}</p>
          </div>
          <Button onPress={() => p.setStep(CreateUserStep.USER_INFO)}>
            Finish
          </Button>
        </div>
      )}
    </div>
  );
}

type UserFormContainerProps = {
  // Add props
};

enum CreateUserStep {
  USER_INFO = 'USER_INFO',
  ACCOUNT_CREATED = 'ACCOUNT_CREATED',
}

export default function UserFormContainer(
  props: UserFormContainerProps
): ReactElement {
  const [createUser] = useCreateNewUserMutation();
  const [updateUser] = useUpdateUserAsAdminMutation();
  const { userId, removeUserId } = useEditUserQueryParams();
  const { data, error, loading } = useGetUserQuery({
    variables: { id: userId ?? '' },
    skip: !userId,
  });
  const user = data?.getUserById
    ? getUserFromUserQuery(data.getUserById)
    : null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(CreateUserStep.USER_INFO);

  const initialFormValues: InitialFormData = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    username: user?.username ?? '',
    isAdmin: user?.role === UserRole.ADMIN,
  };

  const isDisabled = loading || !!error;
  const isSubmitDisabled = loading || !!error;

  const generatedPassword = passwordGenerator.generate({
    length: 12,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId) {
      await updateUser({
        variables: {
          input: {
            id: userId,
            email: email === '' ? initialFormValues?.email : email,
            password: generatedPassword,
            data: {
              role: isAdmin ? UserRole.ADMIN : UserRole.USER,
              firstName:
                firstName === '' ? initialFormValues?.firstName : firstName,
              lastName:
                lastName === '' ? initialFormValues?.lastName : lastName,
              username:
                username === '' ? initialFormValues?.username : username,
            },
          },
        },
        refetchQueries: ['GetUsers'],
      });
    } else {
      const { data } = await createUser({
        variables: {
          input: {
            firstName,
            lastName,
            username,
            email,
            password: generatedPassword,
            role: isAdmin ? UserRole.ADMIN : UserRole.USER,
          },
        },
        refetchQueries: ['GetUsers'],
      });
      if (data?.createUser.createdAt) {
        setStep(CreateUserStep.ACCOUNT_CREATED);
        setPassword(data?.createUser.password);
      }
    }
    handleClearForm();
  };

  const handleClearForm = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setIsAdmin(false);
    initialFormValues.firstName = '';
    initialFormValues.lastName = '';
    initialFormValues.username = '';
    initialFormValues.email = '';
    initialFormValues.isAdmin = false;
    removeUserId();
  };

  return (
    <UserForm
      formData={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        username,
        setUsername,
        email,
        setEmail,
        isAdmin,
        setIsAdmin,
      }}
      initialFormValues={initialFormValues}
      handleSubmit={handleSubmit}
      isDisabled={isDisabled}
      isSubmitDisabled={isSubmitDisabled}
      handleClearForm={handleClearForm}
      step={step}
      setStep={setStep}
      password={password}
    />
  );
}
