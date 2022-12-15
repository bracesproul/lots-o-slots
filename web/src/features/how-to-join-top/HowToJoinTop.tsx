import React, { ReactElement } from 'react';
import { PlayCreateBox } from '@/features';
import { BigSlotsSvg } from '@/assets';

export default function HowToJoinTop(): ReactElement {
  return (
    <div className="how-to-join-top-container">
      <div className="how-to-join-top-text-container">
        <div className="htjt-header">
          <h2 className="how-to-join-text">How To Join?</h2>
          <h1 className="how-to-join-text-subheader">Slots</h1>
        </div>
        <div className="htjt-text">
          <p className="htjt-text-content">
            <span className="red-span-text">Lorem Ipsum</span> is simply dummy
            text of the printing and typesetting industry 1500s, when an unknown
            printer.
          </p>
        </div>
      </div>

      <div className="how-to-join-top-action-container">
        <PlayCreateBox />
        <div className="big-slot-svg-container">
          <BigSlotsSvg />
        </div>
      </div>
      <p className="htjt-text-bottom">
        <span className="red-span-text">Lorem Ipsum</span> is simply dummy text
        of the printing and typesetting industry 1500s, when an unknown printer.
      </p>
    </div>
  );
}
