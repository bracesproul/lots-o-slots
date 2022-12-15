import { ButtonCard } from '@/components';
import { GameSelectionProps } from '../../GameSelection';

export default function GameSelectionCards(
  props: Pick<
    GameSelectionProps,
    'isCardGameSelected' | 'setIsCardGameSelected'
  >
) {
  const { isCardGameSelected, setIsCardGameSelected } = props;

  return (
    <div className="card-selection-container">
      <ButtonCard
        title="Poker"
        image="cards"
        onPress={() => setIsCardGameSelected(true)}
        isSelected={isCardGameSelected}
      />
      <ButtonCard
        title="Slots"
        image="slots"
        onPress={() => setIsCardGameSelected(false)}
        isSelected={!isCardGameSelected}
      />
    </div>
  );
}
