import { ButtonCard } from '@/components';
import { GameSelectionProps } from '../../GameSelection';

export default function GameButtons(
  props: Pick<GameSelectionProps, 'isCardGameSelected'>
) {
  const { isCardGameSelected } = props;

  return (
    <div className="card-selection-container">
      <ButtonCard title="Poker" image="cards" isSelected={isCardGameSelected} />
      <ButtonCard
        title="Slots"
        image="slots"
        isSelected={!isCardGameSelected}
      />
    </div>
  );
}
