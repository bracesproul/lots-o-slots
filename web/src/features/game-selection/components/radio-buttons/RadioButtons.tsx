import {
  PayPalLogo,
  ZelleLogo,
  CashAppLogo,
  SkrillLogo,
  BitcoinLogo,
  EthLogo,
} from '@/assets';
import { Icon, CircleButton } from '@/components';
import { PaymentProvider } from '@/generated/graphql';
import { ReactElement } from 'react';

const PayPalRadioIcon = (
  <Icon content={<PayPalLogo />} height={40} width={30} size="xlarge" />
);

const ZelleRadioIcon = (
  <Icon content={<ZelleLogo />} height={40} width={25} size="xlarge" />
);

const CashAppRadioIcon = (
  <Icon content={<CashAppLogo />} height={40} width={27} size="xlarge" />
);

const SkrillRadioIcon = (
  <Icon content={<SkrillLogo />} height={20} width={50} size="xlarge" />
);

const BitcoinRadioIcon = (
  <Icon content={<BitcoinLogo />} height={45} width={35} size="xlarge" />
);

const EthereumRadioIcon = (
  <Icon content={<EthLogo />} height={45} width={30} size="xlarge" />
);

type RadioButtonPaymentProps = {
  showSkrill?: boolean;
  paymentProvider: PaymentProvider;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
};

export default function RadioButtons(
  props: RadioButtonPaymentProps
): ReactElement {
  const { paymentProvider, setPaymentProvider } = props;

  return (
    <div className="payment-radio-container">
      <CircleButton
        isSelected={paymentProvider === PaymentProvider.PAYPAL}
        onPress={() => setPaymentProvider(PaymentProvider.PAYPAL)}
        iconBackground="white"
        icon={PayPalRadioIcon}
      />
      <CircleButton
        isSelected={paymentProvider === PaymentProvider.ZELLE}
        onPress={() => setPaymentProvider(PaymentProvider.ZELLE)}
        iconBackground="purple"
        icon={ZelleRadioIcon}
      />
      <CircleButton
        isSelected={paymentProvider === PaymentProvider.CASHAPP}
        onPress={() => setPaymentProvider(PaymentProvider.CASHAPP)}
        iconBackground="green"
        icon={CashAppRadioIcon}
      />
      {props.showSkrill && (
        <CircleButton
          isSelected={paymentProvider === PaymentProvider.PAYPAL}
          onPress={() => setPaymentProvider(PaymentProvider.PAYPAL)}
          iconBackground="gradient"
          icon={SkrillRadioIcon}
        />
      )}
      <CircleButton
        isSelected={paymentProvider === PaymentProvider.BITCOIN}
        onPress={() => setPaymentProvider(PaymentProvider.BITCOIN)}
        iconBackground="yellow"
        icon={BitcoinRadioIcon}
      />
      <CircleButton
        isSelected={paymentProvider === PaymentProvider.ETHEREUM}
        onPress={() => setPaymentProvider(PaymentProvider.ETHEREUM)}
        iconBackground="blue"
        icon={EthereumRadioIcon}
      />
    </div>
  );
}
