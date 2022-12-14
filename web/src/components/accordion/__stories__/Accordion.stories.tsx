import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import Accordion from '../Accordion';
import type { AccordionProps } from '../Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

// playground

const PlaygroundTemplate: Story<AccordionProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center bg-black">
      <Accordion {...props} />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  title: 'story title',
  body: 'story body',
};
