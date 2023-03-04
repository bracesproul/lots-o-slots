import { ReactElement } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';
import { Accordion } from '@/components';

export type FaqProps = {
  /** Optional prop for overriding styles */
  className?: string;
};

const PREFIX = StylePrefix.FAQ_SECTION;

const DEFAULT_PROPS: FaqProps = {};

export default function Faq(props: FaqProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <div className={clsx([PREFIX, p.className])}>
      <div className={`${PREFIX}-header-wrapper`}>
        <h1>FAQ</h1>
      </div>
      <Accordion
        title="How Do I Play Poker?"
        body={`Follow the links above to download the Pokerbros app, create an account, join our Club at 86355 - leave referrer ID blank, and deposit above to play within our club!`}
      />
      <Accordion
        title="How do I play slots?"
        body={`Click on create account above to generate your username and either install our mobile app or play through your browser`}
      />
      <Accordion
        title={`Why should I choose Lots O' Slots?`}
        body={`Play and enjoy world-class online social casino games for free. Pulsz games are trusted by over 500,000 social casino-loving Americans so far. The Lots O' Slots customer service team is on standby 24/7, which gets you the help you want quickly, leaving you with more time to play`}
      />
      <Accordion
        title="How Do I deposit?"
        body={`Deposit above by selecting which game you'd like to play, poker or slots and from there you simply choose a desired payment method. Once deposited, your credits will be loaded within minutes!`}
      />
    </div>
  );
}
