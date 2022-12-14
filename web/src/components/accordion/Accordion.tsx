import clsx from 'clsx';
import { ReactElement, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useHover } from '@react-aria/interactions';
import type { AriaButtonProps } from '@react-types/button';

export type AccordionProps = AriaButtonProps & {
  className?: string;

  /**
   * The title of the accordion
   */
  title: string;

  /**
   * The exposed body of the accordion when it is open.
   */
  body: string;
};

export default function Accordion(props: AccordionProps): ReactElement {
  const p = { ...props };
  const [isOpen, setIsOpen] = useState(false);
  const { hoverProps, isHovered } = useHover({ isDisabled: false });

  return (
    <div className={clsx(['accordion-main', props.className])}>
      <div className={'content'}>
        <h3 className={clsx([`title`, { 'is-open': isOpen }])}>{p.title}</h3>
        <p className={clsx([`body`, { 'is-open': isOpen }])}>{p.body}</p>
      </div>
      {!isOpen && (
        <AiOutlinePlus
          {...hoverProps}
          onClick={() => setIsOpen(true)}
          className={clsx([
            `icon`,
            { 'is-open': isOpen, 'is-hovered': isHovered },
          ])}
        />
      )}
      {isOpen && (
        <AiOutlineMinus
          {...hoverProps}
          onClick={() => setIsOpen(false)}
          className={clsx([
            `icon`,
            { 'is-open': isOpen, 'is-hovered': isHovered },
          ])}
        />
      )}
    </div>
  );
}
