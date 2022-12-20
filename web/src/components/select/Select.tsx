import { SelectProps } from '@radix-ui/react-select';
import { ReactElement } from 'react';
import clsx from 'clsx';

const PREFIX = 'select-component';

export type SelectOptionType = {
  value: string;
  name: string;
};

export type SelectComponentProps = SelectProps & {
  className?: string;
  options: SelectOptionType[];
  isDisabled?: boolean;
  label?: string;
  placeholder: string;
};

export default function Select(props: SelectComponentProps): ReactElement {
  const p = { ...props };

  return (
    <select
      className={clsx([`${PREFIX}`, p.className])}
      value={p.value}
      onChange={(e) =>
        p.onValueChange ? p.onValueChange(e.target.value) : undefined
      }
    >
      <option value="" disabled selected>
        {p.placeholder}
      </option>
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
