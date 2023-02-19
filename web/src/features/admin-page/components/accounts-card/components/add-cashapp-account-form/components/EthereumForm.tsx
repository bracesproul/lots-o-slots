import { StylePrefix } from '@/types/style-prefix';
import { ReactElement } from 'react';
import { CryptoFromProps } from '../AddCashappAccountForm';

const PREFIX = StylePrefix.CASHAPP_FORM;

export default function EthereumForm(props: CryptoFromProps): ReactElement {
  const p = { ...props };
  return (
    <>
      <label className={`${PREFIX}-form-label`}>Ethereum Address</label>
      <input
        value={p.address}
        onChange={(e) => p.setAddress(e.target.value)}
        required
        name="address"
        placeholder="Ethereum Address"
        id="address"
        type="text"
        className={`${PREFIX}-form-input`}
      />
    </>
  );
}
