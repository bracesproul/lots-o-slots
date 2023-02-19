import { SelectProps } from '@radix-ui/react-select';
import { ReactElement } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';

const PREFIX = StylePrefix.SELECT_COMPONENT;

export type SelectOptionType = {
  value: string | number;
  name: string | number;
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
