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
  Group,
  Group427321515,
  Vector1,
  Group427321521,
  Group427321516,
  Group427321517,
  Group427321520,
  Group427321522,
  Group427321523,
} from '../../assets/svgs';

export type GameSelectionProps = {
  // todo: add props
};

function GameSelection(props: GameSelectionProps): ReactElement {
  return (
    <div>
      <div>
        <MaskGroup />
      </div>
      <Slots />
      <MaskGroup1 />
      <Poker />
      <Group427321491 />
      <Group427321514 />
      <Path6 />
      <Vector />
      <Group />
      <Group427321515 />
      <Vector1 />
      <Group427321516 />
      <Group427321521 />
      <Group427321517 />
      <Group427321521 />
      <Group427321521 />
      <Group427321520 />
      <Group427321521 />
      <Group427321522 />
      <Group427321523 />
    </div>
  );
}

type GameSelectionContainerProps = GameSelectionProps;

export default function GameSelectionContainer(
  props: GameSelectionContainerProps
): ReactElement {
  return <GameSelection {...props} />;
}
