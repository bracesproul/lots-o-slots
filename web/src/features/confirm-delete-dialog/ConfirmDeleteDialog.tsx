import { Button, Dialog, Input } from '@/components';
import { StylePrefix } from '@/types';
import { FormEvent, ReactElement, useState } from 'react';
import { useDeleteAccountMutation } from '@/generated/graphql';

export type ConfirmDeleteDialogProps = {
  /** Whether or not the dialog is open */
  open: boolean;
  /** Handle close/open dialog function */
  setOpen: (isOpen: boolean) => void;
  /** Submit handler for deleting the account */
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  /**
   * Name of what is being deleted
   * One word, used in the dialog title and confirmation message
   * @example "Account"
   * */
  name: string;
};

const PREFIX = StylePrefix.CONFIRM_DELETE_DIALOG;

export default function ConfirmDeleteDialog(
  props: ConfirmDeleteDialogProps
): ReactElement {
  const p = props;
  const [deleteMessage, setDeleteMessage] = useState('');
  const isSubmitDisabled = deleteMessage !== 'delete account';

  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title={`Delete ${p.name}`}
      buttonTitle="Close"
    >
      <form className={`${PREFIX}-form`} onSubmit={(e) => p.onSubmit(e)}>
        <label className={`${PREFIX}-form-label`}>
          Please type <span className="red-span-text">delete {p.name}</span> to
          confirm
        </label>
        <Input
          type="text"
          value={deleteMessage}
          onChange={setDeleteMessage}
          placeholder={`delete ${p.name}`}
        />
        <Button
          className={`${PREFIX}-form-submit`}
          type="submit"
          isDisabled={isSubmitDisabled}
        >
          Delete
        </Button>
      </form>
    </Dialog>
  );
}
