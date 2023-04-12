import { Input } from '@/components';
import { PaymentProvider } from '@/generated/graphql';
import { StylePrefix } from '@/types/style-prefix';
import clsx from 'clsx';
import { ReactElement } from 'react';

export type PaymentIdentifierInputProps = {
  className?: string;
  paymentProvider: PaymentProvider;
  paymentIdentifier: string;
  setPaymentIdentifier: (paymentIdentifier: string) => void;
};

const getPaymentIdentifier = (paymentProvider: PaymentProvider): string => {
  switch (paymentProvider) {
    case PaymentProvider.ZELLE:
      return 'Zelle Email/Phone Number';
    case PaymentProvider.PAYPAL:
      return 'PayPal Email';
    case PaymentProvider.CASHAPP:
      return 'CashTag';
    case PaymentProvider.BITCOIN:
      return 'Bitcoin Address';
    case PaymentProvider.ETHEREUM:
      return 'Ethereum Address';
    case PaymentProvider.CHASE:
      return 'Chase QuickPay Email';
    default:
      throw new Error('Invalid Payment Provider');
  }
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
