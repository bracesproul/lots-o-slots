import { Story } from '@storybook/react';
import ButtonCard from '../ButtonCard';
import type { ButtonCardProps } from '../ButtonCard';

export default {
  title: 'Components/ButtonCard',
  component: ButtonCard,
};

// playground

const PlaygroundTemplate: Story<ButtonCardProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[30px]">
      <ButtonCard {...props} />
      <ButtonCard isSelected title="Slots" image="slots" />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  title: 'Poker',
  image: 'cards',
};
