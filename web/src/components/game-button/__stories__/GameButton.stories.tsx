import { Story } from '@storybook/react';
import GameButton from '../GameButton';
import type { GameButtonProps } from '../GameButton';

export default {
  title: 'Components/GameButton',
  component: GameButton,
};

// playground

const PlaygroundInputBox: Story<GameButtonProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <GameButton {...props} />
    </div>
  );
};

export const PlaygroundGameInputBox = PlaygroundInputBox.bind({});
PlaygroundInputBox.args = {
  title: 'Play Now!',

  isInput: false,
  placeholder: 'Enter name',
};
