import { ReactElement } from 'react';
const PREFIX = 'cashapp-form';
import { ZelleFormProps } from '../AddCashappAccountForm';

export default function ZelleForm(props: ZelleFormProps): ReactElement {
  const p = { ...props };
  return (
    <>
      <label className={`${PREFIX}-form-label`}>Zelle Email</label>
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
    </>
  );
}
