import { GameSelectionContainer, PageLayout } from '@/features';
import { ReactElement } from 'react';

export default function HomePage(): ReactElement {
  return (
    <PageLayout>
      <GameSelectionContainer />;
    </PageLayout>
  );
}
