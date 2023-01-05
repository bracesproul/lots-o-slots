import { ReactElement } from 'react';
import { Icon } from '@/components';
import { BitcoinLogo, PayPalLogo, ZelleLogo } from '@/assets';
import { format } from 'date-fns';
import { PaymentProvider } from '@/generated/graphql';

export type OtherAccountCardProps = {
  paymentProvider: PaymentProvider;
  emailOrAddress: string;
  lastUpdate?: Date;
};

const PREFIX = 'cashapp-account-card';

const getAccountLogo = (accountType: PaymentProvider): ReactElement => {
  switch (accountType) {
    case PaymentProvider.ZELLE:
      return <ZelleLogo />;
    case PaymentProvider.PAYPAL:
      return <PayPalLogo />;
    case PaymentProvider.ETHEREUM:
      return <></>;
    case PaymentProvider.BITCOIN:
      return <BitcoinLogo />;
    default:
      return <></>;
  }
};

export default function OtherAccountCard(
  props: OtherAccountCardProps
): ReactElement {
  const p = { ...props };
  const dateTime = p.lastUpdate
    ? format(p.lastUpdate, "hh:mmaaaaa'm'")
    : undefined;
  const dateDays = p.lastUpdate ? format(p.lastUpdate, 'mm/dd') : undefined;
  return (
    <div className={`${PREFIX}`}>
      <div className={`${PREFIX}-cashapp-logo-container`}>
        <Icon
          content={getAccountLogo(p.paymentProvider)}
          height={40}
          width={27}
          size="xlarge"
        />
      </div>
      <div className={`${PREFIX}-info-container`}>
        <div className={`${PREFIX}-info-cashtag`}>
          <h1 className={`${PREFIX}-cashtag`}>{props.emailOrAddress}</h1>
        </div>
        <div className={`${PREFIX}-info-stats`}>
          {p.lastUpdate ? (
            <>
              <span className={`${PREFIX}-line-span`}>|</span>
              <p className={`${PREFIX}-stats-text`}>{dateDays}</p>
              <span className={`${PREFIX}-line-span`}>|</span>
              <p className={`${PREFIX}-stats-text`}>{dateTime}</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
