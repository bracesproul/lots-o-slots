import { GameButton, Button, GenerateAccountDialog } from '@/components';
import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';
import { AppStoreButtonsDialog } from '../app-store-buttons-dialog';

type ActionRow = {
  /** The title of the icon button */
  iconButtonTitle: string;
  /** Event handler for the icon button */
  handleIconButtonPress?: () => void;
  /** The title of the primary button */
  primaryButtonTitle: string;
  /** Event handler for the primary button */
  handlePrimaryButtonPress?: () => void;
  /** Open play now dialog */
  openAppStoreDialog?: boolean;
  /** The title of the secondary button */
  secondaryButtonTitle: string;
  /** Event handler for the secondary button */
  handleSecondaryButtonPress?: () => void;
  /** Open create account dialog */
  openCreateAccountDialog?: boolean;
};

export type PlayCreateBoxProps = {
  className?: string;
  /**
   * Whether the card should show all (2) button rows.
   * If false it will show one.
   * @default true
   */
  showAll?: boolean;
  /** The title at the top of the container */
  title?: string;
  /** Event handlers and titles for an action row */
  actionRows?: ActionRow[];
};

const DEFAULT_PROPS = {
  showAll: true,
};

const PREFIX = StylePrefix.PLAY_CREATE_BOX;

export default function PlayCreateBox(
  props?: PlayCreateBoxProps
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const [generateAccountDialogOpen, setGenerateAccountDialogOpen] =
    useState(false);
  const [appStoreDialogOpen, setAppStoreDialogOpen] = useState(false);

  return (
    <div className={clsx(['action-container', p.className])}>
      <h3 className="action-card-header">{p.title}</h3>
      <div className={clsx('play-create-box-container')}>
        <div className={`${PREFIX}-actions-container`}>
          {p.actionRows?.map((row) => (
            <div key={JSON.stringify(row)} className={`${PREFIX}-action-row`}>
              <GameButton
                title={row.iconButtonTitle}
                leftIconType="redChip"
                rightIconType="link"
                rightIconRedBackground
                onPress={() => row.handleIconButtonPress?.()}
              />
              <Button
                type="button"
                variant="primary"
                onPress={() => {
                  row.openAppStoreDialog
                    ? setAppStoreDialogOpen(true)
                    : row.handlePrimaryButtonPress?.();
                }}
              >
                {row.primaryButtonTitle}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onPress={() => {
                  row.openCreateAccountDialog
                    ? setGenerateAccountDialogOpen(true)
                    : row.handleSecondaryButtonPress?.();
                }}
              >
                {row.secondaryButtonTitle}
              </Button>
            </div>
          ))}
        </div>
        {/* <div className="game-selection-left-container">
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
            <Button
              type="button"
              variant="primary"
              onPress={() => setPlayNowStepOneOpen(true)}
            >
              Play Now
            </Button>
          )}
          <Button
            type="button"
            variant="primary"
            onPress={() => setPlayNowStepOneOpen(true)}
          >
            Play Now
          </Button>
        </div>
        <div className="action-buttons-right-container">
          {p.showAll && (
            <Button
              type="button"
              variant="secondary"
              onPress={() => setGenerateAccountDialogOpen(true)}
            >
              Create Account
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onPress={() => setGenerateAccountDialogOpen(true)}
          >
            Create Account
          </Button>
        </div> */}
      </div>
      <AppStoreButtonsDialog
        open={appStoreDialogOpen}
        setOpen={setAppStoreDialogOpen}
      />
      <GenerateAccountDialog
        open={generateAccountDialogOpen}
        setOpen={setGenerateAccountDialogOpen}
      />
    </div>
  );
}
