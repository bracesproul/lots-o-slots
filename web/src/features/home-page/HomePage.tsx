import {
  Header,
  DepositCard,
  SectionOne,
  SectionTwo,
  Faq,
  Footer,
} from './components';
import { StylePrefix } from '@/types/style-prefix';
import clsx from 'clsx';
import React, { ReactElement, useRef } from 'react';
import { Divider } from '@/components';

export type HomePageProps = {
  className?: string;
};

const PREFIX = StylePrefix.HOME;

export default function HomePage(props: HomePageProps): ReactElement {
  const p = { ...props };
  const slotsSectionRef = useRef<HTMLDivElement>(null);
  const pokerSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(`${PREFIX}`, p.className)}>
      <Header
        slotsSectionRef={slotsSectionRef}
        pokerSectionRef={pokerSectionRef}
      />
      <DepositCard />
      <Divider className={`${PREFIX}-divider`} />
      <SectionOne slotsSectionRef={slotsSectionRef} />
      <Divider
        className={clsx(`${PREFIX}-divider`, {
          'is-middle-section': true,
        })}
      />
      <SectionTwo pokerSectionRef={pokerSectionRef} />
      <Divider
        className={clsx(`${PREFIX}-divider`, {
          'is-middle-section': true,
        })}
      />
      <Faq />
      <Footer />
    </div>
  );
}
