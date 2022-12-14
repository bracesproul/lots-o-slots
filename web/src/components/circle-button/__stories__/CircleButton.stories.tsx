import { Story } from '@storybook/react';
import CircleButton from '../CircleButton';
import type { CircleButtonProps } from '../CircleButton';

export default {
  title: 'Components/CircleButton',
  component: CircleButton,
};

// playground

const PlaygroundInputBox: Story<CircleButtonProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <CircleButton {...props} />
    </div>
  );
};

export const PlaygroundGameInputBox = PlaygroundInputBox.bind({});
PlaygroundInputBox.args = {};
