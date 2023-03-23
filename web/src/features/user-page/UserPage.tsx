import { ReactElement } from 'react';
import clsx from 'clsx';
import { PageType, StylePrefix } from '@/types';
import { UserRole } from '@/generated/graphql';
import { DashboardPageHeader, ProfileCard } from '@/features';
import { WithdrawalRequestCard } from './components';

export type UserPageProps = {
  // Add props
};

const PREFIX = StylePrefix.USER_PAGE;

export default function UserPage(props: UserPageProps): ReactElement {
  return (
    <div className={clsx(`${PREFIX}`)}>
      <DashboardPageHeader page={PageType.USER} />
      <div className={`${PREFIX}-content`}>
        <ProfileCard role={UserRole.USER} />
        <WithdrawalRequestCard />
      </div>
    </div>
  );
}
