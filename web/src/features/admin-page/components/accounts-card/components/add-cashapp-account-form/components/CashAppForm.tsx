import { ReactElement } from 'react';
const PREFIX = 'cashapp-form';
import { CashAppFormProps } from '../AddCashappAccountForm';

export default function CashAppForm(props: CashAppFormProps): ReactElement {
  const p = { ...props };
  return (
    <>
      <label className={`${PREFIX}-form-label`}>
        Cashtag{' '}
        <span className={`${PREFIX}-subtext-label`}>
          * Do not include {`'$'`} *
        </span>
      </label>
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
      <label className={`${PREFIX}-form-label`}>Starting Balance</label>
      <input
        className={`${PREFIX}-form-input`}
        type="number"
        placeholder="Starting balance"
        id="balance"
        value={p.balance.toString()}
        onChange={(e) => p.setBalance(Number(e))}
      />
      <label className={`${PREFIX}-form-label`}>Amount Sent</label>
      <input
        className={`${PREFIX}-form-input`}
        type="number"
        placeholder="Amount Sent"
        id="amount-sent"
        value={p.sent.toString()}
        onChange={(e) => p.setSent(Number(e))}
      />
    </>
  );
}
