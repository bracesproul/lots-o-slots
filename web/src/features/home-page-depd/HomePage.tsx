import {
  GameSelectionContainer,
  Footer,
  FaqSection,
  HowToJoinTop,
  HowToJoinLower,
  Header,
} from '@/features';
import { ReactElement, useRef } from 'react';

export default function HomePage(): ReactElement {
  const slotsSectionRef = useRef<HTMLDivElement>(null);
  const pokerSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="home-header">
        <Header
          slotsSectionRef={slotsSectionRef}
          pokerSectionRef={pokerSectionRef}
        />
      </div>
      <div className="section-one">
        <GameSelectionContainer />;
      </div>
      <div className="section-two">
        <HowToJoinTop slotsSectionRef={slotsSectionRef} />
      </div>
      <div className="section-three">
        <HowToJoinLower pokerSectionRef={pokerSectionRef} />
      </div>
      <div className="section-four">
        <FaqSection />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
