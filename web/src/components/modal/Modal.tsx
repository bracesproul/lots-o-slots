import clsx from 'clsx';
import { ReactElement } from 'react';
import * as Radix from '@radix-ui/react-dialog';
import type { DialogContentProps, DialogProps } from '@radix-ui/react-dialog';
import { Icon } from '@/components';
import { CloseIcon } from '@/assets';

export type ModalProps = DialogProps & {
  className?: string;
  children: ReactElement | ReactElement[];
};

type ModalHeaderProps = {
  className?: string;
  children?: ReactElement | ReactElement[];

  /**
   * The title of the modal.
   */
  title?: string;

  /**
   * Whether or not to show the `X` close button.
   * @DEFAULT false
   */
  showCloseButton?: boolean;
};

type ModalContentProps = DialogContentProps & {
  className?: string;
};

type ModalTriggerProps = {
  children: ReactElement | ReactElement[];
};

type ModalFooterProps = {
  className?: string;
  children: ReactElement | ReactElement[];
};

const PREFIX = 'modal';

const DEFAULT_HEADER_PROPS = {
  showCloseButton: true,
};

const DEFAULT_CONTENT_PROPS = {};

const CloseButton = () => (
  <div className={`${PREFIX}-close-button`}>
    <Icon content={<CloseIcon />} />
  </div>
);

function Header(props: ModalHeaderProps): ReactElement {
  const p = { ...DEFAULT_HEADER_PROPS, ...props };
  return (
    <div className={clsx([`${PREFIX}-header`, p.className])}>
      {p.showCloseButton && (
        <Radix.Close asChild>
          <CloseButton />
        </Radix.Close>
      )}
      {p.title && (
        <div className={`${PREFIX}-title-container`}>
          <h1 className={`${PREFIX}-title`}>{p.title}</h1>
        </div>
      )}
      {p.children && (
        <div className={`${PREFIX}-header-children`}>{p.children}</div>
      )}
    </div>
  );
}

function Content(props: ModalContentProps): ReactElement {
  const p = { ...DEFAULT_CONTENT_PROPS, ...props };
  const { className, children, ...otherProps } = p;
  return (
    <Radix.Content
      className={clsx([`${PREFIX}-content`, className, { 'is-open': p.open }])}
      {...otherProps}
    >
      {children}
    </Radix.Content>
  );
}

function Trigger({ children }: ModalTriggerProps): ReactElement {
  return <Radix.Trigger asChild>{children}</Radix.Trigger>;
}

function Footer(props: ModalFooterProps): ReactElement {
  const { className, children } = props;
  return (
    <div className={clsx([`${PREFIX}-footer`, className])}>{children}</div>
  );
}

function Modal(props: ModalProps): ReactElement {
  const { children, ...otherProps } = props;
  return (
    <Radix.Root {...otherProps}>
      <Radix.Overlay asChild>
        <div className={`${PREFIX}-overlay`} />
      </Radix.Overlay>
      {children}
    </Radix.Root>
  );
}

Modal.Header = Header;
Modal.Content = Content;
Modal.Trigger = Trigger;
Modal.Footer = Footer;

export default Modal;
