import { SelectProps } from '@radix-ui/react-select';
import { ReactElement } from 'react';
import clsx from 'clsx';

const PREFIX = 'select-component';

type SelectOptionType = {
  value: string;
  name: string;
};

export type SelectComponentProps = SelectProps & {
  className?: string;
  options: SelectOptionType[];
  isDisabled?: boolean;
  label: string;
};

export default function Select(props: SelectComponentProps): ReactElement {
  const p = { ...props };
  console.log('value', p.value);
  return (
    <select
      className={clsx([`${PREFIX}`, p.className])}
      value={p.value}
      onChange={(e) =>
        p.onValueChange ? p.onValueChange(e.target.value) : undefined
      }
    >
      {p.options.map((option) => (
        <option
          selected={option.value === p.value}
          key={option.value}
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
}
