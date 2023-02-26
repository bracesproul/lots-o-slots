import { createMedia } from '@artsy/fresnel';
import { ReactElement, ReactNode } from 'react';

const AppMediaBreakpoints = createMedia({
  // @ NOTE for consistency, these values should align with those configured in
  // tailwind responsive config (@/tailwind.config.js)
  breakpoints: {
    mobile: 0,
    tablet: 640,
    desktop: 1280,
  },
});

const { Media } = AppMediaBreakpoints;

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

  return (
    <Media at="mobile" className={p.className}>
      {props.children}
    </Media>
  );
};

const Tablet = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...props };

  return (
    <Media greaterThanOrEqual="tablet" className={p.className}>
      {props.children}
    </Media>
  );
};

const Desktop = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...props };

  return (
    <Media greaterThanOrEqual="desktop" className={p.className}>
      {props.children}
    </Media>
  );
};

export { Desktop, Tablet, Mobile };
