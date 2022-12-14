import { ReactElement } from 'react';
import clsx from 'clsx';
import { Accordion, GameButton } from '@/components';

export type GameSelectionProps = {
  // todo: add props
};

function GameSelection(props: GameSelectionProps): ReactElement {
  return (
    <div className={'m-[25px] flex flex-col gap-[30px]'}>
      <Accordion
        title={'How do I play poker?'}
        body={
          'Poker is a game of chance, made up by some random guy in his moms basement.'
        }
      />
      <Accordion
        title={'How do I play poker?'}
        body={
          'Poker is a game of chance, made up by some random guy in his moms basement.Poker is a game of chance, made up by some random guy in his moms basement.Poker is a game of chance, made up by some random guy in his moms basement.Poker is a game of chance, made up by some random guy in his moms basement.Poker is a game of chance, made up by some random guy in his moms basement.'
        }
      />
      <Accordion
        title={'How do I play poker?'}
        body={
          'Poker is a game of chance, made up by some random guy in his moms basement.'
        }
      />
      <GameButton
        title="Play Now!"
        isInput={false}
        leftIconType="link"
        leftIconRedBackground
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
