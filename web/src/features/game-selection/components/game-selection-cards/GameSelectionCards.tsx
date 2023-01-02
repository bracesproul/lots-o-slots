import { ButtonCard } from '@/components';
import { GameSelectionProps } from '../../GameSelection';
import { GameType } from '@/features/play-now-dialog/PlayNowDialog';

export default function GameSelectionCards(
  props: Pick<GameSelectionProps, 'selectedGame' | 'setSelectedGame'>
) {
  const { selectedGame, setSelectedGame } = props;

  return (
    <div className="card-selection-container">
      <ButtonCard
        title="Poker"
        image="cards"
        onPress={() => setSelectedGame(GameType.POKER)}
        isSelected={selectedGame === GameType.POKER}
      />
      <ButtonCard
        title="Slots"
        image="slots"
        onPress={() => setSelectedGame(GameType.SLOTS)}
        isSelected={selectedGame === GameType.SLOTS}
      />
    </div>
  );
}
