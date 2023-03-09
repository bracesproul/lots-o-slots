import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types';
import { useUser } from '@supabase/auth-helpers-react'

export type UserPageProps = {
  /** Optional style prop for overriding the default styles. */
  className?: string;
};

const PREFIX = StylePrefix.USER_PAGE;

function UserPage(props: UserPageProps): ReactElement {
  const p = { ...props };
  const user = useUser();

  React.useEffect(() => {
    if (!user) return;
    console.log('user', user);
  }, [user])

  return (
    <div
      className={clsx(
        `${PREFIX}`,
        p.className,
      )}
    >
      Hello world from UserPage
    </div>
  )
}

export default function UserPageContainer(): ReactElement {
  return <UserPage />;
}
