import { ReactElement } from 'react';
const PREFIX = 'cashapp-form';
import { CryptoFromProps } from '../AddCashappAccountForm';

export default function BitcoinForm(props: CryptoFromProps): ReactElement {
  const p = { ...props };
  return (
    <>
      <label className={`${PREFIX}-form-label`}>Bitcoin Address</label>
      <input
        value={p.address}
        onChange={(e) => p.setAddress(e.target.value)}
        required
        name="address"
        placeholder="Bitcoin Address"
        id="address"
        type="text"
        className={`${PREFIX}-form-input`}
      />
    </>
  );
}
