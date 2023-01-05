import { ReactElement } from 'react';
const PREFIX = 'cashapp-form';
import { PayPalFormProps } from '../AddCashappAccountForm';

export default function PayPalForm(props: PayPalFormProps): ReactElement {
  const p = { ...props };
  return (
    <>
      <label className={`${PREFIX}-form-label`}>PayPal Email</label>
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
