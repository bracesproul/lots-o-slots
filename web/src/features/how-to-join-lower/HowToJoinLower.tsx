import React, { ReactElement } from 'react';
import { PlayCreateBox } from '@/features';
import { BigCardsSvg } from '@/assets';
import { useRouter } from 'next/router';

export type HowToJoinLowerProps = {
  /** Ref used to scroll into view. */
  pokerSectionRef: React.RefObject<HTMLDivElement>;
};

export default function HowToJoinLower(
  props: HowToJoinLowerProps
): ReactElement {
  const { pokerSectionRef } = props;
  const router = useRouter();

  const actionRows = [
    {
      iconButtonTitle: 'Pokerbros',
      handleIconButtonPress: () => {
        router.push('https://i.pokerbros.net/A1lOFP6HJqb');
      },
      primaryButtonTitle: 'Download our App',
      openAppStoreDialog: true,
      secondaryButtonTitle: 'Join our Club',
      handleSecondaryButtonPress: () => {
        router.push('https://i.pokerbros.net/A1lOFP6HJqb');
      },
    },
  ];

  return (
    <div ref={pokerSectionRef} className="how-to-join-lower-container">
      <div className="htjb-text-container">
        <div className="htjb-small-text">
          <p className="htjb-text-content">
            Looking for insane{' '}
            <span className="red-span-text">ACTION POKER?</span> We have 300+
            tables running 24/7, including No Limit Hold&apos;em, Tournaments,
            Limit Hold&apos;em, PLO4, PLO5, PLO6, Open Face Chinese + more!
          </p>
        </div>
        <div className="htjb-header">
          <h2 className="htjb-text">How To Join?</h2>
          <h1 className="htjb-subheader">Poker</h1>
        </div>
      </div>
      <div className="how-to-join-lower-action-container">
        <div className="big-cards-right-container">
          <BigCardsSvg />
        </div>
        <PlayCreateBox actionRows={actionRows} showAll={false} />
      </div>
      {/* <p className="htjb-text-bottom">
        <span className="red-span-text">Lorem Ipsum</span> is simply dummy text
        of the printing and typesetting industry 1500s, when an unknown printer.
      </p> */}
    </div>
  );
}
