import { ReactElement } from 'react';
import { Icon } from '@/components';
import { TwitterLogo, DiscordLogo } from '@/assets';

const TWITTER_URL = 'https://twitter.com/lotsoslots';
const DISCORD_URL = 'https://discord.gg/2Z8Y4Y2';

export type FooterProps = {
  showTwitter?: boolean;
  showDiscord?: boolean;
};

export default function Footer(props: FooterProps): ReactElement {
  return (
    <div className="footer">
      {props.showTwitter && (
        <a
          className="footer-icons"
          href={TWITTER_URL}
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            content={<TwitterLogo />}
            size={'xlarge'}
            height={26}
            width={34}
            className="footer-icons"
          />
        </a>
      )}
      <p className="footer-text">
        © 2022 Lots O’ Slots, LLC. All rights reserved.
      </p>
      {props.showDiscord && (
        <a
          className="footer-icons"
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            content={<DiscordLogo />}
            size={'xlarge'}
            height={28}
            width={34}
          />
        </a>
      )}
    </div>
  );
}
