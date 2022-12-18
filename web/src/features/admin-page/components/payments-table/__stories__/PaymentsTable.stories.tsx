import { Story } from '@storybook/react';
import PaymentsTable from '../PaymentsTable';
import type { PaymentsTableProps } from '../PaymentsTable';

export default {
  title: 'Components/PaymentsTable',
  component: PaymentsTable,
};

// playground

const PlaygroundTemplate: Story<PaymentsTableProps> = (props) => {
  return (
    <div className="flex justify-center">
      <PaymentsTable {...props} />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {};
