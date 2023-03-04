import { ButtonCard } from '@/components';
import { GameType } from '@/features/play-now-dialog-depd/types';
import { GameSelectionProps } from '../../GameSelection';

export default function GameButtons(
  props: Pick<GameSelectionProps, 'selectedGame'>
) {
  const { selectedGame } = props;

  return (
    <div className="card-selection-container">
      <ButtonCard
        title="Poker"
        image="cards"
        isSelected={selectedGame === GameType.POKER}
      />
      <ButtonCard
        title="Slots"
        image="slots"
        isSelected={selectedGame === GameType.SLOTS}
      />
    </div>
  );
}
