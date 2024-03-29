import { Input } from '@/components';
import { getPaymentIdentifier } from '@/features/play-now-dialog-depd/components/payment-identifier-input/PaymentIdentifierInput';
import { PaymentProvider } from '@/types';
import { StylePrefix } from '@/types/style-prefix';
import clsx from 'clsx';
import { ReactElement } from 'react';

export type PaymentIdentifierInputProps = {
  className?: string;
  paymentProvider: PaymentProvider;
  paymentIdentifier: string;
  setPaymentIdentifier: (paymentIdentifier: string) => void;
};

const PREFIX = StylePrefix.PAYMENT_IDENTIFIER_INPUT;

export default function PaymentIdentifierInput(
  props: PaymentIdentifierInputProps
): ReactElement {
  const p = { ...props };
  return (
    <div className={clsx(`${PREFIX}`, p.className)}>
      <label className={`${PREFIX}-form-label`}>
        Enter Your {getPaymentIdentifier(p.paymentProvider)}{' '}
        {p.paymentProvider === PaymentProvider.CASHAPP && (
          <span className={`${PREFIX}-label-sub-text`}>
            * Do NOT Include &quot;$&quot; *
          </span>
        )}
      </label>
      <Input
        type="string"
        value={p.paymentIdentifier}
        onChange={(e) => p.setPaymentIdentifier(e)}
        required
      />
    </div>
  );
}
