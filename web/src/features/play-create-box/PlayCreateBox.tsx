import { GameButton, Button } from '@/components';
import { ReactElement } from 'react';
import clsx from 'clsx';

export type PlayCreateBoxProps = {
  className?: string;
};

export default function PlayCreateBox(props: PlayCreateBoxProps): ReactElement {
  return (
    <div className="action-container">
      <h3 className="action-card-header">
        Action button card container blank title one
      </h3>
      <div className={clsx('play-create-box-container')}>
        <div className="game-selection-left-container">
          <GameButton
            title="Game 1"
            leftIconType="blackChip"
            rightIconType="link"
            rightIconRedBackground
          />
          <GameButton
            title="Game 1"
            leftIconType="redChip"
            rightIconType="link"
            rightIconRedBackground
          />
          <GameButton
            title="Game 1"
            leftIconType="blackChip"
            rightIconType="link"
            rightIconRedBackground
          />
          <GameButton
            title="Game 1"
            leftIconType="redChip"
            rightIconType="link"
            rightIconRedBackground
          />
        </div>
        <div className="action-buttons-middle-container">
          <Button type="button" variant="primary">
            Play Now
          </Button>
          <Button type="button" variant="primary">
            Play Now
          </Button>
          <Button type="button" variant="primary">
            Play Now
          </Button>
          <Button type="button" variant="primary">
            Play Now
          </Button>
        </div>
        <div className="action-buttons-right-container">
          <Button type="button" variant="secondary">
            Create Account
          </Button>
          <Button type="button" variant="secondary">
            Create Account
          </Button>
          <Button type="button" variant="secondary">
            Create Account
          </Button>
          <Button type="button" variant="secondary">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
