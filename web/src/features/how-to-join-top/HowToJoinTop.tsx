import React, { ReactElement } from 'react';
import { PlayCreateBox } from '@/features';
import { SlotsSvg, BigSlotsSvg } from '@/assets';
import { Icon } from '@/components';

export default function HowToJoinTop(): ReactElement {
  return (
    <div className="how-to-join-top-container">
      <div className="how-to-join-top-action-container">
        <PlayCreateBox />
        <div className="big-slot-svg-container">
          <BigSlotsSvg />
        </div>
      </div>
    </div>
  );
}
