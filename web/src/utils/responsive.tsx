import useBreakpoint from 'use-breakpoint';
import { ReactElement, ReactNode } from 'react';

// @ NOTE for consistency, these values should align with those configured in
// tailwind responsive config (@/tailwind.config.js)
const BREAKPOINTS = { mobile: 0, tablet: 640, desktop: 1280 };

type ResponsiveWrapperProps = {
  /**
   * The content to render inside
   * of the selected screen breakpoint
   * */
  children?: ReactNode;

  /** Optional class name to apply styles */
  className?: string;
};

const Mobile = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...props };
  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'mobile', true);

  if (breakpoint !== 'mobile') {
    return <></>;
  }

  return <div className={p.className}>{props.children}</div>;
};

const Tablet = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...props };
  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'tablet', true);

  if (breakpoint !== 'tablet') {
    return <></>;
  }

  return <div className={p.className}>{props.children}</div>;
};

const Desktop = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...props };
  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'desktop', true);

  if (breakpoint !== 'desktop') {
    return <></>;
  }

  return <div className={p.className}>{props.children}</div>;
};

export { Desktop, Tablet, Mobile };
