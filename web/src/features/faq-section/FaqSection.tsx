import { ReactElement } from 'react';
import { Accordion } from '@/components';

export type FaqSectionProps = {
  className?: string;
};

export default function FaqSection(): ReactElement {
  return (
    <div className="faq-section-container">
      <h1 className="faq-header">FAQ</h1>
      <h2 className="faq-subheader">Frequently Asked Questions</h2>
      <Accordion
        title="How Do I Play Poker?"
        body="Lorem Ipsum is simply dummy text of the printing and typesetting industry 1500s, when an unknown printer."
      />
      <Accordion
        title="How do I play slots?"
        body="Lorem Ipsum is simply dummy text of the printing and typesetting industry 1500s, when an unknown printer."
      />
      <Accordion
        title={`Why should I choose Lots O' Slots?`}
        body="Lorem Ipsum is simply dummy text of the printing and typesetting industry 1500s, when an unknown printer."
      />
      <Accordion
        title="How Do I deposit?"
        body="Lorem Ipsum is simply dummy text of the printing and typesetting industry 1500s, when an unknown printer."
      />
    </div>
  );
}
