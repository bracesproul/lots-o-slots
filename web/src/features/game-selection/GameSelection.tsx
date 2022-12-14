import React, { ReactElement } from 'react';
import clsx from 'clsx';
import {
  Accordion,
  GameButton,
  ButtonCard,
  CircleButton,
  Icon,
} from '@/components';
import { PayPalLogo } from '@/assets';

export type GameSelectionProps = {
  // todo: add props
};

function GameSelection(props: GameSelectionProps): ReactElement {
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    console.log('selected', selected);
  }, [selected]);

  return (
    <div className={'m-[25px] flex flex-col gap-[30px]'}>
      <GameButton
        title="Play Now!"
        isInput={false}
        leftIconType="link"
        leftIconRedBackground
      />
      <ButtonCard title="Poker" image="cards" />
      <ButtonCard title="Slots" image="slots" />
      <CircleButton
        onPress={() => setSelected(!selected)}
        isSelected={selected}
        icon={
          <Icon size="xlarge" content={<PayPalLogo />} height={40} width={30} />
        }
      />
      <Accordion
        title={'How do I play poker?'}
        body={
          'Poker is a game of chance, made up by some random guy in his moms basement.'
        }
      />
    </div>
  );
}

type GameSelectionContainerProps = GameSelectionProps;

export default function GameSelectionContainer(
  props: GameSelectionContainerProps
): ReactElement {
  return <GameSelection {...props} />;
}

function Test(): ReactElement {
  return (
    <div className={clsx(`bg`)}>
      <h1 className={clsx(`name`)}>bruh</h1>
    </div>
  );
}
