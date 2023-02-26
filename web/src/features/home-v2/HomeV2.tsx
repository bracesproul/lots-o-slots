import { ReactElement, useRef } from 'react';
import { HeaderV2 } from './components';

export default function HomeV2(): ReactElement {
  const slotsSectionRef = useRef<HTMLDivElement>(null);
  const pokerSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <HeaderV2
        slotsSectionRef={slotsSectionRef}
        pokerSectionRef={pokerSectionRef}
      />
    </div>
  );
}
