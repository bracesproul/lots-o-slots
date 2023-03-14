import { SelectProps } from '@radix-ui/react-select';
import { ReactElement } from 'react';
import clsx from 'clsx';

const PREFIX = 'select-component';

export type SelectOptionType =
  | {
      value: string | number;
      name: string | number;
    }
  | string
  | number;

export type SelectComponentProps = Omit<SelectProps, 'value'> & {
  className?: string;
  options: SelectOptionType[];
  isDisabled?: boolean;
  label?: string;
  placeholder: string;
  value: string | number;
  onChange?: (value: string | number) => void;
};

export type OptionProps = {
  option: SelectOptionType;
  value: string | number;
};

const Option = (props: OptionProps) => {
  const p = { ...props };
  const value =
    typeof props.option === 'string' || typeof props.option === 'number'
      ? props.option
      : props.option.value;
  const name =
    typeof props.option === 'string' || typeof props.option === 'number'
      ? props.option
      : props.option.name;
  return (
    <option selected={value === p.value} value={value}>
      {name}
    </option>
  );
};

export default function Select(props: SelectComponentProps): ReactElement {
  const p = { ...props };

  return (
    <select
      className={clsx([`${PREFIX}`, p.className])}
      value={p.value}
      onChange={(e) => (p.onChange ? p.onChange(e.target.value) : undefined)}
    >
      <option value="" disabled selected>
        {p.placeholder}
      </option>
      {p.options.map((option) => (
        <Option value={p.value} option={option} key={JSON.stringify(option)} />
      ))}
    </select>
  );
}
