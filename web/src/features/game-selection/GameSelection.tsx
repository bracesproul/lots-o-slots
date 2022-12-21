import React, { ReactElement, useState } from 'react';
import { Button } from '@/components';
import { GameSelectionCards, RadioButtons } from './components';

export type PaymentMethodSelectedType = {
  paypalSelected: boolean;
  zelleSelected: boolean;
  cashAppSelected: boolean;
  skrillSelected: boolean;
  bitcoinSelected: boolean;
  ethereumSelected: boolean;
};

export type SiteSelectionOptions = {
  site1: boolean;
  site2: boolean;
  site3: boolean;
  site4: boolean;
};

export type GameSelectionProps = {
  isCardGameSelected: boolean;
  setIsCardGameSelected: (isPokerSelected: boolean) => void;
  paymentMethodSelected: PaymentMethodSelectedType;
  handleRadioButtonSelection: (option: RadioButtonOptions) => void;
  handleSubmit: () => void;
  showSkrill?: boolean;
};

function GameSelection(props: GameSelectionProps): ReactElement {
  const p = { ...props };
  const {
    isCardGameSelected,
    setIsCardGameSelected,
    handleSubmit,
    paymentMethodSelected,
    handleRadioButtonSelection,
  } = p;

  return (
    <div className={'game-selection-container'}>
      <div className="game-selection-left">
        <GameSelectionCards
          setIsCardGameSelected={setIsCardGameSelected}
          isCardGameSelected={isCardGameSelected}
        />
        <RadioButtons
          paymentMethodSelected={paymentMethodSelected}
          handleRadioButtonSelection={handleRadioButtonSelection}
        />
      </div>
      <div className="input-button-container">
        <Button
          className={'max-w-[150px]'}
          onPress={handleSubmit}
          type="submit"
          variant="secondary"
        >
          Deposit
        </Button>
      </div>
    </div>
  );
}

type RadioButtonOptions =
  | 'paypalSelected'
  | 'zelleSelected'
  | 'cashAppSelected'
  | 'skrillSelected'
  | 'bitcoinSelected'
  | 'ethereumSelected';

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

  const handleSubmit = () => {
    // TODO: Add logic to handle form submission
  };

  const handleRadioButtonSelection = (option: RadioButtonOptions) => {
    setPaymentSelected({
      paypalSelected: false,
      zelleSelected: false,
      cashAppSelected: false,
      skrillSelected: false,
      bitcoinSelected: false,
      ethereumSelected: false,
      [option]: true,
    });
  };

  return (
    <GameSelection
      isCardGameSelected={isPokerSelected}
      setIsCardGameSelected={setIsPokerSelected}
      paymentMethodSelected={paymentSelected}
      handleRadioButtonSelection={handleRadioButtonSelection}
      handleSubmit={handleSubmit}
    />
  );
}
