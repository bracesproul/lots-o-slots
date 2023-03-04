import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import cx from 'classnames';
import React, { Fragment, ReactElement } from 'react';
import {
  DialogContentProps,
  DialogProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from '@radix-ui/react-dialog';

export type DialogRootProps = DialogProps & {
  children: ReactElement | ReactElement[];
  title: string;
  description?: string;
  buttonTitle: string;
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

function Dialog(props: DialogRootProps): ReactElement {
  const p = { ...props };
  return (
    <DialogPrimitive.Root open={p.open} onOpenChange={p.onOpenChange}>
      <DialogPrimitive.Portal forceMount>
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
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={cx(
                'fixed z-50',
                'w-[95vw] max-w-md rounded-lg p-[16px] tablet:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-white dark:bg-gray-800',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
              )}
            >
              <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {p.title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400 mb-2">
                {p.description}
              </DialogPrimitive.Description>
              {p.children}
              <div className="mt-4 flex justify-end">
                <DialogPrimitive.Close
                  className={cx(
                    'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                    'border-purple-600 text-white',
                    'border border-transparent',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                  )}
                >
                  {p.buttonTitle}
                </DialogPrimitive.Close>
              </div>

              <DialogPrimitive.Close
                className={cx(
                  'absolute top-[14px] right-[14px] inline-flex items-center justify-center rounded-full p-[4px]',
                  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                )}
              >
                <Cross1Icon className="h-[16px] w-[16px] text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default Dialog;
