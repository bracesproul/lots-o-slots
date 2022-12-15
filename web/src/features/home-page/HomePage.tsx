import {
  GameSelectionContainer,
  Footer,
  FaqSection,
  HowToJoinTop,
  HowToJoinLower,
  Header,
} from '@/features';
import { ReactElement } from 'react';

export default function HomePage(): ReactElement {
  return (
    <div>
      <div className="home-header">
        <Header />
      </div>
      <div className="section-one">
        <GameSelectionContainer />;
      </div>
      <div className="section-two">
        <HowToJoinTop />
      </div>
      <div className="section-three">
        <HowToJoinLower />
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
