import { Button } from '@/components';
import { ReactElement } from 'react';

export type AddAashappAccountFormProps = {
  onSubmit: () => void;
  cashtag: string;
  setCashtag: (cashtag: string) => void;

  email: string;
  setEmail: (email: string) => void;
};

const PREFIX = 'cashapp-form';

export default function AddCashappAccountForm(
  props: AddAashappAccountFormProps
): ReactElement {
  const p = { ...props };
  return (
    <form className={`${PREFIX}-dialog-form`} onSubmit={p.onSubmit}>
      <label className={`${PREFIX}-form-label`}>Cashtag</label>
      <input
        value={p.cashtag}
        onChange={(e) => p.setCashtag(e.target.value)}
        required
        name="cashtag"
        placeholder="Cashtag"
        id="cashtag"
        type="text"
        className={`${PREFIX}-form-input`}
      />
      <label className={`${PREFIX}-form-label`}>Email</label>
      <input
        value={p.email}
        onChange={(e) => p.setEmail(e.target.value)}
        required
        name="email"
        placeholder="email@catchall.com"
        id="email"
        type="email"
        className={`${PREFIX}-form-input`}
      />
      <Button className={`${PREFIX}-form-submit`} type="submit">
        Submit
      </Button>
    </form>
  );
}
