import { ReactElement } from 'react';
import { Icon } from '@/components';
import { CashAppLogo } from '@/assets';
import { format } from 'date-fns';

export type CashappAccountCardProps = {
  cashtag: string;
  balance: number;
  lastUpdate: Date;
};

const PREFIX = 'cashapp-account-card';

export default function CashappAccountCard(
  props: CashappAccountCardProps
): ReactElement {
  const p = { ...props };
  const dateTime = format(p.lastUpdate, "hh:mmaaaaa'm'");
  const dateDays = format(p.lastUpdate, 'mm/dd');
  return (
    <div className={`${PREFIX}`}>
      <div className={`${PREFIX}-cashapp-logo-container`}>
        <Icon content={<CashAppLogo />} height={40} width={27} size="xlarge" />
      </div>
      <div className={`${PREFIX}-info-container`}>
        <div className={`${PREFIX}-info-cashtag`}>
          <h1 className={`${PREFIX}-cashtag`}>${props.cashtag}</h1>
        </div>
        <div className={`${PREFIX}-info-stats`}>
          <p className={`${PREFIX}-stats-text`}>${p.balance}</p>
          <span className={`${PREFIX}-line-span`}>|</span>
          <p className={`${PREFIX}-stats-text`}>{dateDays}</p>
          <span className={`${PREFIX}-line-span`}>|</span>
          <p className={`${PREFIX}-stats-text`}>{dateTime}</p>
        </div>
      </div>
    </div>
  );
}
