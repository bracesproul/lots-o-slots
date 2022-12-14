import { ReactElement } from 'react';
import {
  Poker,
  MaskGroup,
  Slots,
  MaskGroup1,
  Group427321491,
  Group427321514,
  Path6,
  Vector,
  CashAppLogo,
  Group427321515,
  Vector1,
  Group427321521,
  Group427321516,
  Group427321517,
  Group427321520,
  Group427321522,
  Group427321523,
} from '@/assets/svgs';
import clsx from 'clsx';
import { Accordion } from '@/components';

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
