import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React, { Fragment, ReactElement } from 'react';
import {
  DialogContentProps,
  DialogProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from '@radix-ui/react-dialog';

export type DialogRootProps = DialogProps & {
  children: ReactElement | ReactElement[];
};

export type DialogBodyProps = DialogContentProps & {
  className?: string;
  children: ReactElement | ReactElement[];

  /**
   * Whether or not to show the `X` button.
   * @DEFAULT true
   */
  showCloseButton?: boolean;
};

export type DialogHeaderProps = DialogTitleProps & {
  className?: string;
  title?: string;
};

export type DialogSubHeaderProps = DialogDescriptionProps & {
  className?: string;
  description?: string;
};

export type DialogFooterButtonsProps = {
  className?: string;
  children: ReactElement | ReactElement[];
};

const PREFIX = 'dialog';

const DEFAULT_CONTENT_PROPS = {
  showCloseButton: true,
};

function Content(props: DialogBodyProps): ReactElement {
  const p = { ...DEFAULT_CONTENT_PROPS, ...props };

  return (
    <DialogPrimitive.Content
      forceMount
      // className={clsx([`${PREFIX}-content`, p.className])}
      className={`${PREFIX}-content`}
    >
      {p.children}
      <DialogPrimitive.Close className={`${PREFIX}-close-x`}>
        <Cross1Icon className={`${PREFIX}-cross-icon`} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  );
}

function Title(props: DialogHeaderProps): ReactElement {
  const p = { ...props };

  return (
    // <DialogPrimitive.Title className={clsx([`${PREFIX}-title`, p.className])}>
    <DialogPrimitive.Title className={`${PREFIX}-title`}>
      {p.title}
    </DialogPrimitive.Title>
  );
}

function Description(props: DialogSubHeaderProps): ReactElement {
  const p = { ...props };

  return (
    <DialogPrimitive.Description
      className={clsx([`${PREFIX}-description`, p.className])}
    >
      {p.description}
    </DialogPrimitive.Description>
  );
}

function Footer(props: DialogFooterButtonsProps): ReactElement {
  const p = { ...props };

  return (
    <div className={clsx([`${PREFIX}-footer`, p.className])}>
      <DialogPrimitive.Close asChild>{p.children}</DialogPrimitive.Close>
    </div>
  );
}

function Dialog(props: DialogRootProps): ReactElement {
  const p = { ...props };
  console.log('p.open', p.open);
  return (
    <DialogPrimitive.Root open={p.open} onOpenChange={p.onOpenChange}>
      <Transition.Root show={p.open}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay forceMount className={`${PREFIX}-overlay`} />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        ></Transition.Child>
      </Transition.Root>
      {p.children}
    </DialogPrimitive.Root>
  );
}

Dialog.Content = Content;
Dialog.Footer = Footer;
Dialog.Description = Description;
Dialog.Title = Title;

export default Dialog;
