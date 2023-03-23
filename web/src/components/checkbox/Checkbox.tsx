import { checkPath, minusPath } from '@/assets/paths';
import { StylePrefix } from '@/types';
import type { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, ReactElement, useRef } from 'react';
import { Icon, Text } from '..';

export interface CheckboxProps extends RadixCheckboxProps {
  /** Optional style prop for overriding styles */
  className?: string;

  /**
   * The visual style of the checkbox
   * @default 'default'
   */
  variant?: 'default' | 'light';

  /**
   * Whether or not this checkbox is indeterminate
   * @default false
   */
  isIndeterminate?: boolean;

  /**
   * An optional label to display next to the checkbox.
   */
  label?: string;
}

const PREFIX = StylePrefix.CHECKBOX;

const DEFAULT_PROPS = {
  variant: 'default',
  isIndeterminate: false,
} as const;

const CHECK_ICON = checkPath;
const MINUS_ICON = minusPath;

// component
// ---------

function CheckboxComponent(
  props: CheckboxProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  // handle indeterminate state
  // ---------------------------

  const indeterminateProps = p.isIndeterminate ? { checked: true } : {};

  // behaviour
  // ---------

  const { hoverProps, isHovered } = useHover({
    isDisabled: p.disabled,
  });
  const { focusProps, isFocusVisible } = useFocusRing();
  const behaviorProps = mergeProps(hoverProps, focusProps);

  const { disabled, isIndeterminate, ...restProps } = p;

  // rendering
  // ---------

  function renderIndicator() {
    if ((isIndeterminate && disabled) || isIndeterminate) {
      return (
        <Icon
          content={MINUS_ICON}
          size="custom"
          className={`${PREFIX}-indicator`}
        />
      );
    }

    return (
      <Icon
        content={CHECK_ICON}
        size="custom"
        className={`${PREFIX}-indicator`}
      />
    );
  }

  function renderCheckbox() {
    return (
      <RadixCheckbox.Root
        {...behaviorProps}
        {...restProps}
        {...indeterminateProps}
        disabled={p.disabled}
        className={clsx(
          `${PREFIX} variant-${p.variant}`,
          {
            'is-hovered': isHovered,
            'is-disabled': p.disabled,
            'is-focus-visible': isFocusVisible,
            'is-indeterminate': p.isIndeterminate,
            'has-label': !!p.label,
          },
          p.className
        )}
      >
        <RadixCheckbox.Indicator>{renderIndicator()}</RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    );
  }

  return (
    <>
      {p.label ? (
        <label className={`${PREFIX}-label-wrapper`}>
          {renderCheckbox()}
          <Text
            className={clsx(`${PREFIX}-label-text`, `variant-${p.variant}`)}
          >
            {p.label}
          </Text>
        </label>
      ) : (
        renderCheckbox()
      )}
    </>
  );
}

/**
 * A control that allows the user to toggle between checked and not checked.
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  CheckboxComponent
);

export default Checkbox;
