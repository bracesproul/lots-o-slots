import { Button, Dialog, Input } from '@/components';
import { ReactElement, useState } from 'react';
import { useCreateUserMutation } from '@/generated/graphql';
import { handleSetUserCookie } from '@/utils';

type OptionalFieldsType = {
  cashtag: string;
  zelleEmail: string;
  paypalEmail: string;
};

export type GenerateAccountDialogProps = {
  onSubmit: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: boolean;
  loading: boolean;
  setOptionalFields: (optionalFields: OptionalFieldsType) => void;
  optionalFields: OptionalFieldsType;
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
      title="Create Account"
      buttonTitle="Close"
    >
      {p.error ? (
        <h1 className={`${PREFIX}-error`}>
          An error occurred, please try again later
        </h1>
      ) : (
        <></>
      )}
      <form
        className={`${PREFIX}-dialog-form`}
        onSubmit={(e) => {
          e.preventDefault();
          p.onSubmit();
        }}
      >
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
          value={p.password}
          onChange={p.setPassword}
          required
        />
        <p className={`${PREFIX}-text`}>Optional fields:</p>
        <label className={`${PREFIX}-form-label`}>
          Cashtag{' '}
          <span className={`${PREFIX}-label-sub-text`}>
            * Do NOT Include &quot;$&quot; *
          </span>
        </label>
        <Input
          placeholder="$Cashtag"
          type="text"
          value={p.optionalFields.cashtag}
          onChange={(v) =>
            p.setOptionalFields({ ...p.optionalFields, cashtag: v })
          }
        />
        <label className={`${PREFIX}-form-label`}>Zelle Email</label>
        <Input
          placeholder="email@zelle.com"
          type="text"
          value={p.optionalFields.zelleEmail}
          onChange={(v) =>
            p.setOptionalFields({ ...p.optionalFields, zelleEmail: v })
          }
        />
        <label className={`${PREFIX}-form-label`}>PayPal Email</label>
        <Input
          placeholder="email@paypal.com"
          type="text"
          value={p.optionalFields.paypalEmail}
          onChange={(v) =>
            p.setOptionalFields({ ...p.optionalFields, paypalEmail: v })
          }
        />
        <Button
          isDisabled={p.error || !p.username || !p.password || p.loading}
          className={`${PREFIX}-form-submit`}
          type="submit"
        >
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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optionalFields, setOptionalFields] = useState({
    cashtag: '',
    zelleEmail: '',
    paypalEmail: '',
  });
  const [createUser] = useCreateUserMutation();

  return (
    <GenerateAccountDialog
      {...props}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
      setOptionalFields={setOptionalFields}
      optionalFields={optionalFields}
      onSubmit={async () => {
        setLoading(true);
        const { errors, data } = await createUser({
          variables: {
            input: {
              email: username,
              password,
              balance: 0,
              userIdentifier: username,
              cashtag: optionalFields.cashtag,
              zelleEmail: optionalFields.zelleEmail,
              payPalEmail: optionalFields.paypalEmail,
            },
          },
        });
        if (errors?.length) {
          setError(true);
        } else {
          props.setOpen(false);
          handleSetUserCookie(data?.createUser.id);
        }
        setLoading(false);
      }}
    />
  );
}
