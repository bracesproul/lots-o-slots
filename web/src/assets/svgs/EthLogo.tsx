import { ReactElement } from 'react';
import { SvgContentProps } from '../types';

export default function EthLogo(props: SvgContentProps): ReactElement {
  let { height, width } = props;
  if (!height) height = 43;
  if (!width) width = 26;
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 12.941 0.672 V 15.972 L 25.873 21.751 L 12.941 0.672 Z"
        fill="white"
      />
      <path
        d="M 12.941 0.672 L 0.007 21.751 L 12.941 15.972 V 0.672 Z"
        fill="white"
      />
      <path
        d="M 12.941 31.666 V 42.063 L 25.882 24.159 L 12.941 31.666 Z"
        fill="white"
      />
      <path
        d="M 12.941 42.063 V 31.665 L 0.007 24.159 L 12.941 42.063 Z"
        fill="white"
      />
      <path
        d="M 12.941 29.26 L 25.873 21.751 L 12.941 15.976 V 29.26 Z"
        fill="white"
      />
      <path
        d="M 0.007 21.751 L 12.941 29.26 V 15.976 L 0.007 21.751 Z"
        fill="white"
      />
    </svg>
  );
}
