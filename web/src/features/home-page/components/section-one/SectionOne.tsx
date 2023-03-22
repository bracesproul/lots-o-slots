import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';
import { GameButton, Button } from '@/components';
import { useRouter } from 'next/router';
import BigSlotsSvg from '@/assets/svgs/BigSlotsSvg';
import { GenerateAccountDialog } from './components';

type ActionsBoxContainerProps = {
  handlePressPlayOnWeb: () => void;
  handlePressInstallMobileApp: () => void;
  handlePressCreateAccount: () => void;
};

export type SectionOneProps = ActionsBoxContainerProps & {
  /** Optional prop for overriding styles */
  className?: string;
  /** Ref used to scroll to page location */
  slotsSectionRef: React.RefObject<HTMLDivElement>;
  /** State variable for controlling whether or not the generate account dialog is open */
  createAccountDialogOpen: boolean;
  /** Setter function for handling whether or not the generate account dialog is open */
  setCreateAccountDialogOpen: (createAccountDialogOpen: boolean) => void;
};

const PREFIX = StylePrefix.SECTION_ONE;

const DEFAULT_PROPS = {};

const SectionOneHeader = (): ReactElement => (
  <div className={`${PREFIX}-header-wrapper`}>
    <div className={`${PREFIX}-title`}>
      <h1>How to join?</h1>
      <h1>
        <span className="red-span-text">Slots</span>
      </h1>
    </div>
    <div className={`${PREFIX}-subtitle`}>
      <h1>
        Create your account, deposit, and{' '}
        <span className="red-span-text">PLAY NOW</span>
      </h1>
    </div>
  </div>
);

const ActionsBoxContainer = (props: ActionsBoxContainerProps): ReactElement => (
  <div className={`${PREFIX}-actions-wrapper`}>
    <GameButton
      title={'Play on Web'}
      leftIconType="redChip"
      rightIconType="link"
      rightIconRedBackground
      onPress={props.handlePressPlayOnWeb}
      className="m-auto"
    />
    <Button
      type="button"
      variant="primary"
      onPress={props.handlePressInstallMobileApp}
      className="m-auto"
    >
      Install Mobile App
    </Button>
    <Button
      type="button"
      variant="secondary"
      onPress={props.handlePressCreateAccount}
      className="m-auto"
    >
      Get Slots Login
    </Button>
  </div>
);

const FooterTextContainer = (): ReactElement => (
  <div className={`${PREFIX}-footer-text-wrapper`}>
    <p className="text-center">
      Lots o&apos; Slots currently hosts over 80 different slots and games with
      some of the biggest <span className="red-span-text">JACKPOTS</span> given
      out to date!
    </p>
  </div>
);

function SectionOne(props: SectionOneProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <div ref={p.slotsSectionRef} className={clsx([PREFIX, p.className])}>
      <SectionOneHeader />
      <div className="my-[46px]">
        <ActionsBoxContainer
          handlePressPlayOnWeb={p.handlePressPlayOnWeb}
          handlePressInstallMobileApp={p.handlePressInstallMobileApp}
          handlePressCreateAccount={p.handlePressCreateAccount}
        />
        <div className={`${PREFIX}-slots-icon-wrapper`}>
          <BigSlotsSvg />
        </div>
      </div>
      <FooterTextContainer />
      <GenerateAccountDialog
        open={p.createAccountDialogOpen}
        setOpen={p.setCreateAccountDialogOpen}
      />
    </div>
  );
}

export default function SectionOneContainer(
  props: Pick<SectionOneProps, 'slotsSectionRef'>
): ReactElement {
  const router = useRouter();
  const [createAccountDialogOpen, setCreateAccountDialogOpen] = useState(false);

  const handlePressPlayOnWeb = () => {
    window.open('http://h5.firekirin.xyz/firekirin/hall/index.html', '_blank')
  };
  const handlePressInstallMobileApp = () => {
    window.open('http://firekirin.xyz:8580/index.html', '_blank')
  };
  const handlePressCreateAccount = () => {
    setCreateAccountDialogOpen(true);
  };

  return (
    <SectionOne
      {...props}
      handlePressPlayOnWeb={handlePressPlayOnWeb}
      handlePressInstallMobileApp={handlePressInstallMobileApp}
      handlePressCreateAccount={handlePressCreateAccount}
      createAccountDialogOpen={createAccountDialogOpen}
      setCreateAccountDialogOpen={setCreateAccountDialogOpen}
    />
  );
}
