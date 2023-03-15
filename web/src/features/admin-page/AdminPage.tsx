import { ReactElement } from 'react';
import { PageChangeType, TableType } from '@/types/page-change';
import { StylePrefix } from '@/types/style-prefix';
import { AdminPageHeader } from '../admin-page-header';
import { InitialFormValues, PageType, UserInfoFormData } from '@/types';
import { Button, Input } from '@/components';

export type AdminPageProps = {
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
  initialFormValues: InitialFormValues;
};

const PREFIX = StylePrefix.ADMIN_PAGE_V2;

export default function AdminPage(props: AdminPageProps): ReactElement {
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

  return (
    <div className={`${PREFIX}`}>
      <AdminPageHeader page={PageType.ADMIN} />
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
              required
              autoComplete="off"
            />
            <Input
              type="password"
              required
              value={password === '' ? p.initialFormValues?.password : password}
              onChange={setPassword}
              label="Password"
              className={`${PREFIX}-normal-input`}
              labelClassName={`${PREFIX}-input-label`}
              error={p.invalidPasswordMessage}
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
              value={username === '' ? p.initialFormValues?.username : username}
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
  );
}

function AdminPageContainer(): ReactElement {
  
}
