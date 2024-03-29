import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';
import { GameButton, Button } from '@/components';
import { UpToDesktop, Desktop } from '@/utils/responsive';
import BigCardsSvg from '@/assets/svgs/BigCardsSvg';
import { useRouter } from 'next/router';
import { AppStoreButtonsDialog } from '@/features';

export type SectionTwoProps = {
  /** Optional prop for overriding styles */
  className?: string;
  /** Ref used to scroll to page location */
  pokerSectionRef: React.RefObject<HTMLDivElement>;
};

const PREFIX = StylePrefix.SECTION_TWO;

const DEFAULT_PROPS = {};

const SectionTwoHeader = (): ReactElement => (
  <>
    <UpToDesktop className={`${PREFIX}-header-wrapper`}>
      <div className={`${PREFIX}-title`}>
        <h1>How to join?</h1>
        <h1>
          <span className="red-span-text">Poker</span>
        </h1>
      </div>
      <div className={`${PREFIX}-subtitle`}>
        <h1>
          Looking for insane{' '}
          <span className="red-span-text">ACTION POKER?</span> We have 300+
          tables running 24/7, including No Limit Hold&apos;em, Tournaments,
          Limit Hold&apos;em, PLO4, PLO5, PLO6, Open Face Chinese + more!
        </h1>
      </div>
    </UpToDesktop>
    <Desktop className={`${PREFIX}-header-wrapper`}>
      <div className={`${PREFIX}-subtitle`}>
        <h1>
          Looking for insane{' '}
          <span className="red-span-text">ACTION POKER?</span> We have 300+
          tables running 24/7, including No Limit Hold&apos;em, Tournaments,
          Limit Hold&apos;em, PLO4, PLO5, PLO6, Open Face Chinese + more!
        </h1>
      </div>
      <div className={`${PREFIX}-title`}>
        <h1>How to join?</h1>
        <h1>
          <span className="red-span-text">Poker</span>
        </h1>
      </div>
    </Desktop>
  </>
);

const ActionsBoxContainer = (): ReactElement => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className={`${PREFIX}-actions-wrapper`}>
      <GameButton
        title={'Pokerbros'}
        leftIconType="redChip"
        rightIconType="link"
        rightIconRedBackground
        onPress={() =>
          window.open('https://i.pokerbros.net/A1lOFP6HJqb', '_blank')
        }
        className="m-auto"
      />
      <Button
        type="button"
        variant="primary"
        onPress={() => setOpen(true)}
        className="m-auto"
      >
        Download the App
      </Button>
      <Button
        type="button"
        variant="secondary"
        onPress={() =>
          window.open('https://i.pokerbros.net/A1lOFP6HJqb', '_blank')
        }
        className="m-auto"
      >
        Join the Club
      </Button>
      <AppStoreButtonsDialog open={open} setOpen={setOpen} />
    </div>
  );
};

const FooterTextContainer = (props: { className?: string }): ReactElement => (
  <div className={clsx(`${PREFIX}-footer-text-wrapper`, props.className)}>
    <p>
      Lots o&apos; Slots currently hosts over 80 different slots and games with
      some of the biggest <span className="red-span-text">JACKPOTS</span> given
      out to date!
    </p>
  </div>
);

export default function SectionTwo(props: SectionTwoProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <div ref={p.pokerSectionRef} className={clsx([PREFIX, p.className])}>
      <SectionTwoHeader />
      <div className="my-[46px]">
        <ActionsBoxContainer />
        <div className={`${PREFIX}-slots-icon-wrapper`}>
          <BigCardsSvg />
        </div>
      </div>
      <FooterTextContainer />
    </div>
  );
}
