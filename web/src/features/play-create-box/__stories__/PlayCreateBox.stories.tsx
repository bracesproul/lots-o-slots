import { Story } from '@storybook/react';
import PlayCreateBox from '../PlayCreateBox';
import type { PlayCreateBoxProps } from '../PlayCreateBox';

export default {
  title: 'Components/PlayCreateBox',
  component: PlayCreateBox,
};

// playground

const Playground: Story<PlayCreateBoxProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <PlayCreateBox {...props} />
    </div>
  );
};

export const PlaygroundGameInputBox = Playground.bind({});
Playground.args = {
};
