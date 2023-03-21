import { Button } from '@/components';
import { StylePrefix } from '@/types/style-prefix';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';

export type HeaderProps = {
  className?: string;
  /** Ref used to scroll to page location */
  slotsSectionRef: React.RefObject<HTMLDivElement>;
  pokerSectionRef: React.RefObject<HTMLDivElement>;
};

const PREFIX = StylePrefix.HEADER;

export default function Header(props: HeaderProps): ReactElement {
  const p = { ...props };
  const router = useRouter();
  const { slotsSectionRef, pokerSectionRef } = p;
  const handleScrollToSlots = () => {
    slotsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPoker = () => {
    pokerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={PREFIX + '-wrapper'}>
      <h2 className={`header-nav-logo`}>
        Lots <span className="red-span-text">{`O'`}</span> Slots
      </h2>
      <div className={PREFIX + '-nav-wrapper'}>
        <div className={`${PREFIX}-nav-buttons`}>
          <Button
            type="button"
            variant="secondary"
            onPress={async () => await router.push('/login')}
          >
            Login
          </Button>
          <Button
            type="button"
            variant="primary"
            onPress={async () => await router.push('/signup')}
          >
            Sign Up
          </Button>
        </div>
        <div className={`${PREFIX}-nav-buttons`}>
          <Button
            type="button"
            variant="secondary"
            onPress={handleScrollToSlots}
          >
            Play Slots
          </Button>
          <Button type="button" variant="primary" onPress={handleScrollToPoker}>
            Play Poker
          </Button>
        </div>
      </div>
    </div>
  );
}
