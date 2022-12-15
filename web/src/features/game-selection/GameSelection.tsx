import React, { ReactElement, useState } from 'react';
import { GameButton, Button } from '@/components';
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

  slotsUsername: string;
  setSlotsUsername: (slotsUsername: string) => void;

  emailOrUsername: string;
  setEmailOrUsername: (emailOrUsername: string) => void;

  handleSubmit: () => void;

  siteButtonOptions: SiteSelectionOptions;
  handleSiteSelection: (siteButtonOptions: SiteSelectionOptionType) => void;
};

function GameSelection(props: GameSelectionProps): ReactElement {
  const p = { ...props };
  const {
    isCardGameSelected,
    setIsCardGameSelected,
    slotsUsername,
    setSlotsUsername,
    emailOrUsername,
    setEmailOrUsername,
    handleSubmit,
    siteButtonOptions,
    handleSiteSelection,
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
        <div className="input-button-container">
          <GameButton
            isInput
            leftIconType="link"
            leftIconRedBackground
            placeholder="Input Slots Username"
            value={slotsUsername}
            onChange={(value) => setSlotsUsername(value)}
          />
          <div className="bottom-input-container">
            <GameButton
              isInput
              leftIconType="link"
              leftIconRedBackground
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(value) => setEmailOrUsername(value)}
            />
            <Button onPress={handleSubmit} className="ml-[15px]" type="submit">
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
            onPress={() => handleSiteSelection('site1')}
            selected={siteButtonOptions.site1}
          />
          <GameButton
            title="Site 1"
            rightIconType="link"
            rightIconRedBackground
            leftIconType="redChip"
            onPress={() => handleSiteSelection('site2')}
            selected={siteButtonOptions.site2}
          />
          <GameButton
            title="Site 1"
            rightIconType="link"
            rightIconRedBackground
            leftIconType="blackChip"
            onPress={() => handleSiteSelection('site3')}
            selected={siteButtonOptions.site3}
          />
          <GameButton
            title="Site 1"
            rightIconType="link"
            rightIconRedBackground
            leftIconType="redChip"
            onPress={() => handleSiteSelection('site4')}
            selected={siteButtonOptions.site4}
          />
        </div>
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

type SiteSelectionOptionType = 'site1' | 'site2' | 'site3' | 'site4';

export default function GameSelectionContainer(): ReactElement {
  const [paymentSelected, setPaymentSelected] = useState({
    paypalSelected: true,
    zelleSelected: false,
    cashAppSelected: false,
    skrillSelected: false,
    bitcoinSelected: false,
    ethereumSelected: false,
  });
  const [siteButtonOptions, setSiteButtonOptions] = useState({
    site1: false,
    site2: false,
    site3: false,
    site4: false,
  });
  const [isPokerSelected, setIsPokerSelected] = useState(true);
  const [slotsUsername, setSlotsUsername] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');

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

  const handleSiteSelection = (option: SiteSelectionOptionType) => {
    setSiteButtonOptions({
      site1: false,
      site2: false,
      site3: false,
      site4: false,
      [option]: true,
    });
  };

  console.log('siteButtonOptions', siteButtonOptions);

  return (
    <GameSelection
      isCardGameSelected={isPokerSelected}
      setIsCardGameSelected={setIsPokerSelected}
      paymentMethodSelected={paymentSelected}
      handleRadioButtonSelection={handleRadioButtonSelection}
      slotsUsername={slotsUsername}
      setSlotsUsername={setSlotsUsername}
      emailOrUsername={emailOrUsername}
      setEmailOrUsername={setEmailOrUsername}
      handleSubmit={handleSubmit}
      siteButtonOptions={siteButtonOptions}
      handleSiteSelection={handleSiteSelection}
    />
  );
}
