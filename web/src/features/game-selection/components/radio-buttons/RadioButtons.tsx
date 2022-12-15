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

type RadioButtonOptions =
  | 'paypalSelected'
  | 'zelleSelected'
  | 'cashAppSelected'
  | 'skrillSelected'
  | 'bitcoinSelected'
  | 'ethereumSelected';

export default function RadioButtons(
  props: Pick<
    GameSelectionProps,
    'paymentMethodSelected' | 'setPaymentSelected'
  >
): ReactElement {
  const { paymentMethodSelected, setPaymentSelected } = props;

  function handleSelect(option: RadioButtonOptions): void {
    setPaymentSelected({
      paypalSelected: false,
      zelleSelected: false,
      cashAppSelected: false,
      skrillSelected: false,
      bitcoinSelected: false,
      ethereumSelected: false,
      [option]: true,
    });
  }

  return (
    <div className="payment-radio-container">
      <CircleButton
        isSelected={paymentMethodSelected.paypalSelected}
        onPress={() => handleSelect('paypalSelected')}
        iconBackground="white"
        icon={PayPalRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.zelleSelected}
        onPress={() => handleSelect('zelleSelected')}
        iconBackground="purple"
        icon={ZelleRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.cashAppSelected}
        onPress={() => handleSelect('cashAppSelected')}
        iconBackground="green"
        icon={CashAppRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.skrillSelected}
        onPress={() => handleSelect('skrillSelected')}
        iconBackground="gradient"
        icon={SkrillRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.bitcoinSelected}
        onPress={() => handleSelect('bitcoinSelected')}
        iconBackground="yellow"
        icon={BitcoinRadioIcon}
      />
      <CircleButton
        isSelected={paymentMethodSelected.ethereumSelected}
        onPress={() => handleSelect('ethereumSelected')}
        iconBackground="blue"
        icon={EthereumRadioIcon}
      />
    </div>
  );
}
