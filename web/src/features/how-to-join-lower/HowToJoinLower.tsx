import React, { ReactElement } from 'react';
import { PlayCreateBox } from '@/features';
import { BigCardsSvg } from '@/assets';

export default function HowToJoinLower(): ReactElement {
  return (
    <div className="how-to-join-lower-container">
      <div className="how-to-join-lower-action-container">
        <div className="big-cards-right-container">
          <BigCardsSvg />
        </div>
        <PlayCreateBox />
      </div>
    </div>
  );
}
