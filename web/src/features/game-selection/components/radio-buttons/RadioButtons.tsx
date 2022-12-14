import {
  PayPalLogo,
  ZelleLogo,
  CashAppLogo,
  SkrillLogo,
  BitcoinLogo,
  EthLogo,
} from '@/assets';
import { Icon, CircleButton } from '@/components';
import { ReactElement } from 'react';
import { GameSelectionProps } from '../../GameSelection';

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

export default function RadioButtons(
  props: Pick<GameSelectionProps, 'paymentMethodSelected'>
): ReactElement {
  const { paymentMethodSelected } = props;
  return (
    <div className="payment-radio-container">
      <CircleButton
        isSelected={paymentMethodSelected.paypalSelected}
        iconBackground="white"
        icon={PayPalRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.zelleSelected}
        iconBackground="purple"
        icon={ZelleRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.cashAppSelected}
        iconBackground="green"
        icon={CashAppRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.skrillSelected}
        iconBackground="gradient"
        icon={SkrillRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.bitcoinSelected}
        iconBackground="yellow"
        icon={BitcoinRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.ethereumSelected}
        iconBackground="blue"
        icon={EthereumRadioIcon}
      />
    </div>
  );
}
