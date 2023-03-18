import { PaymentProvider, StylePrefix } from '@/types';
import { FormEvent, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { Button, Input, Select, Text } from '@/components';
import { useCreateWithdrawalRequestMutation } from '@/generated/graphql';
import { useUser } from '@/hooks';
import {
  getPaymentProviderFromString,
  PAYMENT_OPTIONS,
} from '@/features/admin-accounts-page/components/account-form/utils';

type WithdrawalRequestFormData = {
  /** The payment type of the account */
  paymentProvider?: PaymentProvider;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
  /** The amount to withdraw */
  amount: number;
  setAmount: (amount: number) => void;
  /** The identifier for the account */
  payoutIdentifier: string;
  setPayoutIdentifier: (payoutIdentifier: string) => void;
};

export type WithdrawalRequestCardProps = {
  /** Optional style prop for overriding the default styles. */
  className?: string;
  /** Whether or not the submit and inputs are disabled */
  isDisabled?: boolean;
  /** State variables and setter function for controlling inputs */
  formData: WithdrawalRequestFormData;
  /** Submit handler for creating an account */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  /** Whether or not the save button is disabled. */
  isSaveDisabled: boolean;
  /** The step of the withdrawal request the user is on */
  step: WithdrawalRequestStep;
};

const PREFIX = StylePrefix.WITHDRAWAL_REQUEST_CARD;

function WithdrawalRequestCard(
  props: WithdrawalRequestCardProps
): ReactElement {
  const p = { ...props };
  const {
    paymentProvider,
    setPaymentProvider,
    amount,
    setAmount,
    payoutIdentifier,
    setPayoutIdentifier,
  } = p.formData;

  const getLabelForPayoutIdentifier = (paymentProvider: PaymentProvider) => {
    switch (paymentProvider) {
      case PaymentProvider.PAYPAL:
        return 'PayPal Email';
      case PaymentProvider.ZELLE:
        return 'Zelle Phone Number or Email';
      case PaymentProvider.CASHAPP:
        return 'Cashtag';
      case PaymentProvider.BITCOIN:
      case PaymentProvider.ETHEREUM:
        return 'Wallet Address';
      default:
        'Payment Identifier';
    }
  };

  return (
    <div className={clsx(`${PREFIX}-content`, p.className)}>
      <div className={`${PREFIX}-card`}>
        <form onSubmit={(e) => p.handleSubmit(e)}>
          <div className={`${PREFIX}-instructions`}>
            <h1 className={`${PREFIX}-heading`}>
              Withdrawal{' '}
              {p.step === WithdrawalRequestStep.CONFIRMATION && 'Confirmed'}
            </h1>
          </div>
          <div className={`${PREFIX}-fields`}>
            {p.step === WithdrawalRequestStep.FORM && (
              <>
                <Select
                  placeholder="Select a payout method"
                  options={PAYMENT_OPTIONS}
                  required
                  value={paymentProvider}
                  onChange={(e) => {
                    if (typeof e !== 'string') return;

                    const newPaymentProvider = getPaymentProviderFromString(e);
                    console.log('new payment provider', newPaymentProvider);
                    setPaymentProvider(newPaymentProvider);
                  }}
                  className={'bg-white text-black w-[350px]'}
                />
                <Input
                  type="number"
                  value={amount}
                  onChange={(value) => setAmount(Number(value))}
                  label="Amount"
                  className={`${PREFIX}-normal-input`}
                  labelClassName={`${PREFIX}-input-label`}
                  isDisabled={p.isDisabled}
                  required
                  autoComplete="off"
                />
                {paymentProvider && (
                  <Input
                    type="text"
                    required
                    value={payoutIdentifier}
                    onChange={setPayoutIdentifier}
                    label={getLabelForPayoutIdentifier(
                      paymentProvider ?? PaymentProvider.PAYPAL
                    )}
                    className={`${PREFIX}-normal-input`}
                    labelClassName={`${PREFIX}-input-label`}
                    isDisabled={p.isDisabled}
                  />
                )}

                <div>
                  <Button
                    type="submit"
                    isDisabled={p.isSaveDisabled}
                    variant="primary"
                    className={`${PREFIX}-submit-button`}
                  >
                    Submit
                  </Button>
                </div>
              </>
            )}
            {p.step === WithdrawalRequestStep.CONFIRMATION && (
              <div className={`${PREFIX}-confirmation`}>
                <Text type="body-lg">
                  Please give our staff time to complete your withdrawal. Thank
                  you!
                </Text>
              </div>
            )}
            {p.step === WithdrawalRequestStep.ERROR && (
              <div className={`${PREFIX}-error`}>
                <Text type="body-lg" className="text-red-500">
                  There was an error submitting your withdrawal request. Please
                  try again. If this error persists contact staff.
                </Text>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export type WithdrawalRequestCardContainerProps = {
  // Add props
};

enum WithdrawalRequestStep {
  FORM = 'FORM',
  CONFIRMATION = 'CONFIRMATION',
  ERROR = 'ERROR',
}

export default function WithdrawalRequestCardContainer(
  props: WithdrawalRequestCardContainerProps
): ReactElement {
  const p = { ...props };
  const { userId } = useUser();
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>();
  const [amount, setAmount] = useState<number>(0);
  const [payoutIdentifier, setPayoutIdentifier] = useState<string>('');
  const [step, setStep] = useState<WithdrawalRequestStep>(
    WithdrawalRequestStep.FORM
  );
  const [createWithdrawalRequest] = useCreateWithdrawalRequestMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !paymentProvider) return;
    const { data } = await createWithdrawalRequest({
      variables: {
        input: {
          userId,
          amount,
          payoutMethod: paymentProvider,
          payoutAddress: payoutIdentifier,
        },
      },
    });
    if (data?.createWithdrawalRequest.success) {
      setStep(WithdrawalRequestStep.CONFIRMATION);
    } else {
      setStep(WithdrawalRequestStep.ERROR);
    }
  };

  const isSaveDisabled =
    !paymentProvider || amount === 0 || payoutIdentifier === '';

  return (
    <WithdrawalRequestCard
      formData={{
        payoutIdentifier,
        setPayoutIdentifier,
        amount,
        setAmount,
        paymentProvider,
        setPaymentProvider,
      }}
      handleSubmit={handleSubmit}
      isSaveDisabled={isSaveDisabled}
      step={step}
    />
  );
}
