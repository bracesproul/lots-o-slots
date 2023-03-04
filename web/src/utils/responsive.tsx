import { createMedia } from '@artsy/fresnel';
import { ReactElement, ReactNode } from 'react';

/**
 * Responsive wrapper components that help you to conditionally show parts
 * of the DOM based on media query.
 *
 * @NOTE these wrappers work with server side rendering (SSR) as they do not
 * conditionally render, but render all elements and then conditionally
 * display elements on the client side based on css media queries.
 * However, this means they should not be used too high up the React DOM tree
 * or they risk signficantly increasing the size of the page sent down to the
 * client over the wire.
 *
 * If you need to narrow what gets rendered and sent down to the client
 * based on a user agent screen you can find an example here:
 * https://github.com/artsy/fresnel/tree/main/examples/kitchen-sink
 *
 * @NOTE these wrapper components wrap all items in a <div />. If you need to
 * avoid this, you can follow the example here:
 * https://github.com/artsy/fresnel/blob/main/examples/kitchen-sink/src/App.tsx
 */

const AppMediaBreakpoints = createMedia({
  // @ NOTE for consistency, these values should align with those configured in
  // tailwind responsive config (@/assets/tokens/custom/screen.js)
  breakpoints: {
    mobile: 0,
    tablet: 640,
    desktop: 1024,
  },
});

const { Media } = AppMediaBreakpoints;

type ResponsiveWrapperProps = {
  /** Optional shared style prop */
  className?: string;
  /**
   * The children of the reponsive <div> that will only display
   * according to media queries.
   */
  children?: ReactNode;
};

const DEFAULT_PROPS = { asFragment: false } as const;

const Mobile = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <Media at="mobile" className={props.className}>
      {props.children}
    </Media>
  );
};

const UpToDesktop = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <Media lessThan="desktop" className={props.className}>
      {props.children}
    </Media>
  );
};

const Tablet = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <Media between={['tablet', 'desktop']} className={props.className}>
      {props.children}
    </Media>
  );
};

const TabletAndAbove = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <Media greaterThanOrEqual="tablet" className={props.className}>
      {props.children}
    </Media>
  );
};

const DesktopAndAbove = (props: ResponsiveWrapperProps): ReactElement => {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <Media greaterThanOrEqual="desktop" className={props.className}>
      {props.children}
    </Media>
  );
};

const { MediaContextProvider } = AppMediaBreakpoints;
const mediaStyles = AppMediaBreakpoints.createMediaStyle();

export {
  DesktopAndAbove as Desktop,
  TabletAndAbove,
  Tablet,
  Mobile,
  UpToDesktop,
  MediaContextProvider,
  mediaStyles,
};
