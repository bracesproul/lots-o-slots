import { Footer } from '@/features';

export type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout(props: PageLayoutProps): React.ReactElement {
  const { children } = props;
  return <div className="page-layout">{children}</div>;
}
