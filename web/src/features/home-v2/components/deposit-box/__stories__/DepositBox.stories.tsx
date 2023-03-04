import { Story } from '@storybook/react';
import type { DepositBoxV2ContainerProps } from '../DepositBox';
import DepositBox from '../DepositBox';

export default {
  title: 'Components/DepositBox',
  component: DepositBox,
};

// playground

const PlaygroundTemplate: Story<DepositBoxV2ContainerProps> = (props) => {
  return (
    <div className="flex justify-center">
      <DepositBox {...props} />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {};
