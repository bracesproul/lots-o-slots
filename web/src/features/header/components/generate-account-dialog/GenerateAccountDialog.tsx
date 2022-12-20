import { Button, Dialog, Input } from '@/components';
import { ReactElement, useState } from 'react';

export type GenerateAccountDialogProps = {
  onSubmit: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

const PREFIX = 'generate-account-dialog';

function GenerateAccountDialog(
  props: GenerateAccountDialogProps
): ReactElement {
  const p = { ...props };
  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title="Add New CashApp Account"
      buttonTitle="Close"
    >
      <form className={`${PREFIX}-dialog-form`} onSubmit={p.onSubmit}>
        <label className={`${PREFIX}-form-label`}>Username</label>
        <Input
          placeholder="Username"
          type="text"
          value={p.username}
          onChange={p.setUsername}
          required
        />
        <label className={`${PREFIX}-form-label`}>Password</label>
        <Input
          placeholder="Password"
          type="password"
          value={p.username}
          onChange={p.setUsername}
          required
        />
        <Button className={`${PREFIX}-form-submit`} type="submit">
          Submit
        </Button>
      </form>
    </Dialog>
  );
}

export default function GenerateAccountDialogContainer(
  props: Pick<GenerateAccountDialogProps, 'open' | 'setOpen'>
): ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <GenerateAccountDialog
      {...props}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={() => {
        // TODO: add
      }}
    />
  );
}
