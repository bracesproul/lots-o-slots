import { ReactElement, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type { AriaButtonProps } from '@react-types/button';
import { StylePrefix } from '@/types/style-prefix';

export type InteractableComponentProps = AriaButtonProps & {
  children: ReactElement;
  isDisabled?: boolean;
};

const PREFIX = StylePrefix.INTERACTABLE_COMPONENT;

export default function InteractableComponent(
  props: InteractableComponentProps
): ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { hoverProps } = useHover({ isDisabled: props.isDisabled });
  const behaviorProps = mergeProps(buttonProps, hoverProps);

  return (
    <div {...behaviorProps} className={`${PREFIX}`}>
      {props.children}
    </div>
  );
}
