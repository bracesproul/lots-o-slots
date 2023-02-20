import React, { ReactElement } from 'react';
import { PlayCreateBox } from '@/features';
import { BigSlotsSvg } from '@/assets';
import { useRouter } from 'next/router';

export type HowToJoinTopProps = {
  /** Ref used to scroll into view. */
  slotsSectionRef: React.RefObject<HTMLDivElement>;
};

export default function HowToJoinTop(props: HowToJoinTopProps): ReactElement {
  const { slotsSectionRef } = props;
  const router = useRouter();

  const actionRows = [
    {
      iconButtonTitle: 'Play on Web',
      handleIconButtonPress: () => {
        router.push('http://h5.firekirin.xyz/firekirin/hall/index.html');
      },
      primaryButtonTitle: 'Install Mobile App',
      handlePrimaryButtonPress: () => {
        router.push('http://firekirin.xyz:8580/index.html');
      },
      secondaryButtonTitle: 'Create Account',
      openCreateAccountDialog: true,
    },
  ];

  return (
    <div ref={slotsSectionRef} className="how-to-join-top-container">
      <div className="how-to-join-top-text-container">
        <div className="htjt-header">
          <h2 className="how-to-join-text">How To Join?</h2>
          <h1 className="how-to-join-text-subheader">Slots</h1>
        </div>
        <div className="htjt-text">
          <p className="htjt-text-content">
            Create your account, deposit, and{' '}
            <span className="red-span-text">PLAY NOW</span>
          </p>
        </div>
      </div>

      <div className="how-to-join-top-action-container">
        <PlayCreateBox
          actionRows={actionRows}
          title="Play on your phone or computer using these links below"
        />
        <div className="big-slot-svg-container">
          <BigSlotsSvg />
        </div>
      </div>
      <p className="htjt-text-bottom">
        Lots o&apos; Slots currently hosts over 80 different slots and games
        with some of the biggest <span className="red-span-text">JACKPOTS</span>{' '}
        given out to date!
      </p>
    </div>
  );
}
