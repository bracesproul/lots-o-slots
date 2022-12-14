import { Story } from '@storybook/react';
import CircleButton from '../CircleButton';
import type { CircleButtonProps } from '../CircleButton';
import { PayPalLogo } from '@/assets/svgs';
import { Icon } from '@/components';

export default {
  title: 'Components/CircleButton',
  component: CircleButton,
};

// playground

const Playground: Story<CircleButtonProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <CircleButton {...props} />
    </div>
  );
};

export const PlaygroundCircleButtons = Playground.bind({});
Playground.args = {
  iconBackground: 'purple',
  icon: <Icon size="xlarge" content={<PayPalLogo />} height={40} width={30} />,
};
