import { ReactElement } from 'react';
import { Dialog, Badge } from '@/components';

export type SuccessDialogProps = {
  className?: string;

  open: boolean;
  setOpen: (open: boolean) => void;
};

const PREFIX = 'success-dialog';

export default function SuccessDialog(props: SuccessDialogProps): ReactElement {
  const p = { ...props };
  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title={'Success'}
      buttonTitle="Close"
    >
      <div className={`${PREFIX}`}>
        <h1 className={`${PREFIX}-title`}>
          Your deposit has been successfully sent.
        </h1>
        <p className={`${PREFIX}-secondary`}>
          Please wait a few minutes for your balance to update.
        </p>
        <p className={`${PREFIX}-secondary`}>Support Signal number:</p>
        <Badge className={'m-auto mt-[15px]'} variant="info">
          {'(657)-738-3455'}
        </Badge>
      </div>
    </Dialog>
  );
}
