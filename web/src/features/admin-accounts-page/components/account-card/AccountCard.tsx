import { EditSvg, TrashCanSvg } from '@/assets';
import { Badge, InteractableComponent } from '@/components';
import {
  findBadgeVariantFromPaymentType,
  findStringFromPaymentType,
} from '@/features/play-now-dialog-depd/utils';
import { StylePrefix, PaymentProvider } from '@/types';
import clsx from 'clsx';
import { ReactElement, useState } from 'react';
import { ConfirmDeleteDialog } from './components';

const PREFIX = StylePrefix.ACCOUNT_CARD;

export type Account = {
  /** The accounts ID */
  id: string;
  /** The account's name */
  name: string;
  /** The accounts identifier */
  identifier: string;
  /** The accounts balance */
  balance: number;
  /** The accounts payment provider */
  paymentProvider: PaymentProvider;
  /**
   * Whether or not the account is default for its payment type
   * @default false
   */
  isDefault?: boolean;
};

export type AccountCardProps = Account & {
  /** Optional className to override default styles. */
  className?: string;
  /** Handle edit */
  onEdit: (accountId: string) => void;
};

const DEFAULT_PROPS = {
  isDefault: false,
};

export default function AccountCard(props: AccountCardProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx(PREFIX, p.className)}>
      <div className={`${PREFIX}-header`}>
        <div className={`${PREFIX}-header-content`}>
          <p className={`${PREFIX}-name`}>{p.name}</p>
          <p className={`${PREFIX}-subtitle`}>{p.identifier}</p>
        </div>
        <div className={`${PREFIX}-header-actions`}>
          <InteractableComponent onPress={() => p.onEdit(p.id)}>
            <EditSvg />
          </InteractableComponent>
          <InteractableComponent onPress={() => setOpen(true)}>
            <TrashCanSvg />
          </InteractableComponent>
        </div>
      </div>
      <div className={`${PREFIX}-content`}>
        <div className={`${PREFIX}-content-row`}>
          <p className={`${PREFIX}-label`}>Balance:</p>
          <p className={`${PREFIX}-value`}>{p.balance}</p>
        </div>
        <div className={`${PREFIX}-content-row`}>
          <p className={`${PREFIX}-label`}>Type:</p>
          <Badge
            size="small"
            variant={findBadgeVariantFromPaymentType(p.paymentProvider)}
            title={findStringFromPaymentType(p.paymentProvider)}
          />
        </div>
        {p.isDefault && (
          <div className={`${PREFIX}-content-row`}>
            <Badge
              size="small"
              variant="success"
              title={`Default ${findStringFromPaymentType(
                p.paymentProvider
              )} Account`}
            />
          </div>
        )}
      </div>
      <ConfirmDeleteDialog open={open} setOpen={setOpen} accountId={p.id} />
    </div>
  );
}
