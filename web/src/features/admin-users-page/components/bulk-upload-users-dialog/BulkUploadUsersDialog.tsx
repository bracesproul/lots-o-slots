import { Button, Dialog, Input, Text } from '@/components';
import { StylePrefix } from '@/types';
import { FormEvent, ReactElement, useState } from 'react';
import { useBulkUploadUsersMutation } from '@/generated/graphql';

export type BulkUploadUsersDialogProps = {
  /** Whether or not the dialog is open */
  open: boolean;
  /** Handle close/open dialog function */
  setOpen: (isOpen: boolean) => void;
  /** Submit handler */
  handleSubmit: (users: BulkUser[]) => void;
  /** Step the modal is at */
  step: BulkUploadUsersStep;
  /** Set the step the modal is at */
  setStep: (step: BulkUploadUsersStep) => void;
};

const PREFIX = StylePrefix.BULK_USER_UPLOAD_DIALOG;

type BulkUser = {
  username: string;
  password: string;
};

enum BulkUploadUsersStep {
  ENTER_USERS,
  FORMATTED_USERS,
  ERROR,
  UPLOAD_ERROR,
  SUCCESS,
}

function BulkUploadUsersDialog(
  props: BulkUploadUsersDialogProps
): ReactElement {
  const p = props;
  const { step, setStep } = p;
  const [users, setUsers] = useState('');
  const [bulkUsers, setBulkUsers] = useState<BulkUser[]>([]);

  const parseOutUsers = () => {
    const usersArray = users.split(' ');
    const parsedUsers: BulkUser[] = usersArray.map((user) => {
      const [username, password] = user.split(':');
      if (!username || !password) {
        setStep(BulkUploadUsersStep.ERROR);
      }
      return { username, password };
    });
    if (step !== BulkUploadUsersStep.ERROR) {
      setStep(BulkUploadUsersStep.FORMATTED_USERS);
    }
    setBulkUsers(parsedUsers);
  };

  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title={`Bulk Upload Users`}
      buttonTitle="Close"
    >
      <>
        {step === BulkUploadUsersStep.ENTER_USERS && (
          <form className={`${PREFIX}-form`}>
            <Text className={`${PREFIX}-form-label`}>Enter accounts</Text>
            <Text className={`${PREFIX}-form-label`}>Format:</Text>
            <Text className={`${PREFIX}-form-label`}>
              `username:password username:password`
            </Text>
            <textarea
              value={users}
              onChange={(e) => setUsers(e.target.value)}
            />
            <Button
              className={`${PREFIX}-form-submit`}
              type="button"
              onPress={parseOutUsers}
            >
              Format
            </Button>
          </form>
        )}
        {step === BulkUploadUsersStep.FORMATTED_USERS && (
          <div className="text-white text-center">
            <Text className={`${PREFIX}-form-label`} type="h2">
              Success
            </Text>
            <Text className={`${PREFIX}-form-label`} type="h3">
              Accounts to be created
            </Text>
            <ul>
              {bulkUsers.map((user, index) => (
                <li key={`${user.username}-${user.password}`}>
                  {index + 1}. {user.username} - {user.password}
                </li>
              ))}
            </ul>
            <Button
              className={`${PREFIX}-form-submit mt-[12px]`}
              type="button"
              onPress={() => p.handleSubmit(bulkUsers)}
            >
              Submit
            </Button>
          </div>
        )}
        {step === BulkUploadUsersStep.ERROR && (
          <Text>Error parsing users, try again.</Text>
        )}
        {step === BulkUploadUsersStep.UPLOAD_ERROR && (
          <Text>Error uploading users, try again.</Text>
        )}
        {step === BulkUploadUsersStep.SUCCESS && (
          <Text className={`${PREFIX}-form-label`} type="h2">
            Success
          </Text>
        )}
      </>
    </Dialog>
  );
}

type BulkUploadUsersDialogContainerProps = {
  /** Whether or not the dialog is open */
  open: boolean;
  /** Handle close/open dialog function */
  setOpen: (isOpen: boolean) => void;
};

export default function BulkUploadUsersDialogContainer(
  props: BulkUploadUsersDialogContainerProps
): ReactElement {
  const [bulkUploadUsers] = useBulkUploadUsersMutation();
  const [step, setStep] = useState(BulkUploadUsersStep.ENTER_USERS);

  const handleSubmit = async (users: BulkUser[]) => {
    const { errors } = await bulkUploadUsers({
      variables: {
        input: {
          users,
        },
      },
      refetchQueries: ['GetUsers'],
    });
    if (errors && errors.length > 0) {
      setStep(BulkUploadUsersStep.UPLOAD_ERROR);
    } else {
      setStep(BulkUploadUsersStep.SUCCESS);
    }
  };

  return (
    <BulkUploadUsersDialog
      {...props}
      handleSubmit={handleSubmit}
      step={step}
      setStep={setStep}
    />
  );
}
