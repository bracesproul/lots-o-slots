import React, { ReactElement } from 'react';
import { PlayCreateBox } from '@/features';
import { BigCardsSvg } from '@/assets';

export default function HowToJoinLower(): ReactElement {
  return (
    <div className="how-to-join-lower-container">
      <div className="htjb-text-container">
        <div className="htjb-small-text">
          <p className="htjb-text-content">
            <span className="red-span-text">Lorem Ipsum</span> is simply dummy
            text of the printing and typesetting industry 1500s, when an unknown
            printer.
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
        <PlayCreateBox showAll={false} />
      </div>
      <p className="htjb-text-bottom">
        <span className="red-span-text">Lorem Ipsum</span> is simply dummy text
        of the printing and typesetting industry 1500s, when an unknown printer.
      </p>
    </div>
  );
}
