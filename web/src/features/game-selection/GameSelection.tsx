import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import {
  Accordion,
  GameButton,
  ButtonCard,
  CircleButton,
  Icon,
  Button,
} from '@/components';
import {
  PayPalLogo,
  ZelleLogo,
  CashAppLogo,
  SkrillLogo,
  BitcoinLogo,
  EthLogo,
} from '@/assets';
import { GameButtons, GameSelectionCards, RadioButtons } from './components';

type PaymentMethodSelectedType = {
  paypalSelected: boolean;
  zelleSelected: boolean;
  cashAppSelected: boolean;
  skrillSelected: boolean;
  bitcoinSelected: boolean;
  ethereumSelected: boolean;
};

export type GameSelectionProps = {
  isCardGameSelected: boolean;
  paymentMethodSelected: PaymentMethodSelectedType;
};

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

function GameSelection(props: GameSelectionProps): ReactElement {
  const p = { ...props };
  const { isCardGameSelected, paymentMethodSelected } = p;

  return (
    <div className={'game-selection-container'}>
      <div className="game-selection-left">
        <GameSelectionCards isCardGameSelected={isCardGameSelected} />
        <RadioButtons paymentMethodSelected={paymentMethodSelected} />
        <div className="input-button-container">
          <GameButton
            isInput
            leftIconType="link"
            leftIconRedBackground
            placeholder="Input Slots Username"
          />
          <div className="bottom-input-container">
            <GameButton
              isInput
              leftIconType="link"
              leftIconRedBackground
              placeholder="Email or Username"
            />
            <Button type="submit">Deposit</Button>
          </div>
        </div>
      </div>
      <div className="game-selection-right">
        <div className="right-buttons-container">
          <GameButton
            title="Site 1"
            rightIconType="link"
            rightIconRedBackground
            leftIconType="blackChip"
            className="right-button"
          />
          <GameButton
            title="Site 1"
            rightIconType="link"
            rightIconRedBackground
            leftIconType="redChip"
            className="right-button"
          />
          <GameButton
            title="Site 1"
            rightIconType="link"
            rightIconRedBackground
            leftIconType="blackChip"
            className="right-button"
          />
          <GameButton
            title="Site 1"
            rightIconType="link"
            rightIconRedBackground
            leftIconType="redChip"
            className="right-button"
          />
        </div>
      </div>
    </div>
  );
}

type GameSelectionContainerProps = GameSelectionProps;

export default function GameSelectionContainer(): ReactElement {
  const [paymentSelected, setPaymentSelected] = useState({
    paypalSelected: true,
    zelleSelected: false,
    cashAppSelected: false,
    skrillSelected: false,
    bitcoinSelected: false,
    ethereumSelected: false,
  });
  const [isPokerSelected, setIsPokerSelected] = useState(true);

  return (
    <GameSelection
      isCardGameSelected={isPokerSelected}
      paymentMethodSelected={paymentSelected}
    />
  );
}
