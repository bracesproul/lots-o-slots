import { Button, Dialog, Input } from '@/components';
import { StylePrefix } from '@/types';
import { FormEvent, ReactElement, useState } from 'react';
import { useDeleteAccountMutation } from '@/generated/graphql';

export type ConfirmDeleteDialogProps = {
  /** Whether or not the dialog is open */
  open: boolean;
  /** Handle close/open dialog function */
  setOpen: (isOpen: boolean) => void;
  /** The ID of the account to delete */
  accountId: string;
  /** Submit handler for deleting the account */
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const PREFIX = StylePrefix.CONFIRM_DELETE_DIALOG;

function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps): ReactElement {
  const p = props;
  const [deleteMessage, setDeleteMessage] = useState('');
  const isSubmitDisabled = deleteMessage !== 'delete account';

  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title="Delete Account"
      buttonTitle="Close"
    >
      <form className={`${PREFIX}-form`} onSubmit={(e) => p.onSubmit(e)}>
        <label className={`${PREFIX}-form-label`}>
          Please type <span className="red-span-text">delete account</span> to
          confirm
        </label>
        <Input
          type="text"
          value={deleteMessage}
          onChange={setDeleteMessage}
          placeholder="delete account"
        />

        <Button
          className={`${PREFIX}-form-submit`}
          type="submit"
          isDisabled={isSubmitDisabled}
        >
          Delete Account
        </Button>
      </form>
    </Dialog>
  );
}

type ConfirmDeleteDialogContainerProps = Pick<
  ConfirmDeleteDialogProps,
  'open' | 'setOpen' | 'accountId'
>;

export default function ConfirmDeleteDialogContainer(
  props: ConfirmDeleteDialogContainerProps
): ReactElement {
  const [deleteAccount] = useDeleteAccountMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteAccount({
      variables: {
        id: props.accountId,
      },
      refetchQueries: ['GetAllAccounts'],
    });
    props.setOpen(false);
  };

  return <ConfirmDeleteDialog {...props} onSubmit={handleSubmit} />;
}
