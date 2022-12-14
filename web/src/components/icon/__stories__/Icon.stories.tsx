import { Story } from '@storybook/react';
import Icon from '../Icon';
import type { IconProps } from '../Icon';
import {
  Poker,
  MaskGroup,
  PayPalLogo,
  Slots,
  MaskGroup1,
  ZelleLogo,
  BitcoinLogo,
  CashAppLogo,
  Group427321515,
  SkrillLogo,
  LinkIcon,
  Group427321517,
  Group427321520,
  Group427321522,
  LinkIconDark,
} from '@/assets/svgs';

export default {
  title: 'Components/Icon',
  component: Icon,
};

// playground

const NonSvgTemplate: Story<IconProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <MaskGroup />
      <Group427321517 />
      <MaskGroup1 />
      <Group427321520 />
    </div>
  );
};

const PayPal: Story<IconProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <Icon size="xlarge" content={<PayPalLogo />} height={40} width={30} />
    </div>
  );
};

const ZelleIcon: Story<IconProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <Icon
        size="xlarge"
        content={<ZelleLogo />}
        height={40}
        width={25}
        className={'bg-purple-500'}
      />
    </div>
  );
};

const BitcoinIcon: Story<IconProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <Icon
        size="xlarge"
        content={<BitcoinLogo />}
        height={45}
        width={20}
        className={'bg-yellow-500'}
      />
    </div>
  );
};

const CashApp: Story<IconProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <Icon
        size="xlarge"
        content={<CashAppLogo />}
        height={40}
        width={20}
        className={'bg-green-500'}
      />
    </div>
  );
};

const SkrillIcon: Story<IconProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <Icon
        size="xlarge"
        content={<SkrillLogo />}
        height={20}
        width={50}
        className={'bg-purple-700'}
      />
    </div>
  );
};

const LinkIconPlayground: Story<IconProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <Icon
        size="xlarge"
        content={<LinkIcon />}
        height={25}
        width={25}
        className={'bg-red-600'}
      />
    </div>
  );
};

const LinkIconDarkPlayground: Story<IconProps> = (props) => {
  return (
    <div className="flex min-h-[700px] min-w-[700px] justify-center gap-[25px]">
      <Icon size="xlarge" content={<LinkIconDark />} height={25} width={25} />
    </div>
  );
};

export const PlaygroundNonSvg = NonSvgTemplate.bind({});
export const PlaygroundPayPal = PayPal.bind({});
export const PlaygroundZelleIcon = ZelleIcon.bind({});
export const PlaygroundBitcoinIcon = BitcoinIcon.bind({});
export const PlaygroundCashAppIcon = CashApp.bind({});
export const PlaygroundSkrillIcon = SkrillIcon.bind({});
export const PlaygroundLinkIcon = LinkIconPlayground.bind({});
export const PlaygroundLinkIconDark = LinkIconDarkPlayground.bind({});
