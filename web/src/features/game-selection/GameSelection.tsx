import React, { ReactElement, useState } from 'react';
import { GameButton, Button } from '@/components';
import { GameSelectionCards, RadioButtons } from './components';

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
            <Button
              onPress={() => console.log('deposit pressed')}
              className="ml-[15px]"
              type="submit"
            >
              Deposit
            </Button>
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

export default function GameSelectionContainer(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentSelected, setPaymentSelected] = useState({
    paypalSelected: true,
    zelleSelected: false,
    cashAppSelected: false,
    skrillSelected: false,
    bitcoinSelected: false,
    ethereumSelected: false,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPokerSelected, setIsPokerSelected] = useState(true);

  return (
    <GameSelection
      isCardGameSelected={isPokerSelected}
      paymentMethodSelected={paymentSelected}
    />
  );
}
