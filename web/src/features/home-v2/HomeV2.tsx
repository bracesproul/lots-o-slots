import { ReactElement, useRef } from 'react';
import { HeaderV2, DepositBoxV2 } from './components';
import { Divider } from '@/components';
import { StylePrefix } from '@/types/style-prefix';

const PREFIX = StylePrefix.HOME_V2;

export default function HomeV2(): ReactElement {
  const slotsSectionRef = useRef<HTMLDivElement>(null);
  const pokerSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className={PREFIX}>
      <HeaderV2
        slotsSectionRef={slotsSectionRef}
        pokerSectionRef={pokerSectionRef}
      />
      <DepositBoxV2 />
      <div className={'h-[5px] w-full bg-blue-200'} />
      <Divider className={'w-full mt-[200px]'} />
    </div>
  );
}
