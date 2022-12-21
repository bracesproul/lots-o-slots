import { GameButton, Button } from '@/components';
import { ReactElement } from 'react';
import clsx from 'clsx';

export type PlayCreateBoxProps = {
  className?: string;
  /**
   * Whether the card should show all (2) button rows.
   * If false it will show one.
   * @default true
   */
  showAll?: boolean;
};

const DEFAULT_PROPS = {
  showAll: true,
};

export default function PlayCreateBox(
  props?: PlayCreateBoxProps
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  return (
    <div className={clsx(['action-container', p.className])}>
      <h3 className="action-card-header">
        Action button card container blank title one
      </h3>
      <div className={clsx('play-create-box-container')}>
        <div className="game-selection-left-container">
          {p.showAll && (
            <GameButton
              title="Game 1"
              leftIconType="redChip"
              rightIconType="link"
              rightIconRedBackground
            />
          )}
          <GameButton
            title="Game 1"
            leftIconType="blackChip"
            rightIconType="link"
            rightIconRedBackground
          />
        </div>
        <div className="action-buttons-middle-container">
          {p.showAll && (
            <Button type="button" variant="primary">
              Play Now
            </Button>
          )}
          <Button type="button" variant="primary">
            Play Now
          </Button>
        </div>
        <div className="action-buttons-right-container">
          {p.showAll && (
            <Button type="button" variant="secondary">
              Create Account
            </Button>
          )}
          <Button type="button" variant="secondary">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
