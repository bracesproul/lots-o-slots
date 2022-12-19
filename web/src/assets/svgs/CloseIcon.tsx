import { ReactElement } from 'react';
import { SvgContentProps } from '../types';

export default function CloseIcon(props: SvgContentProps): ReactElement {
  let { height, width } = props;
  if (!height) height = 1000;
  if (!width) width = 1000;
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
        d="M500,623.8L159.9,963.9c-34.6,34.6-90.1,34.7-124.3,0.5c-34.4-34.4-34-89.8,0.5-124.3L376.2,500L36.1,159.9C1.5,125.3,1.4,69.8,35.6,35.6c34.4-34.4,89.8-34,124.3,0.5L500,376.2L840.1,36.1c34.6-34.6,90.1-34.7,124.3-0.5c34.4,34.4,34,89.8-0.5,124.3L623.8,500l340.1,340.1c34.6,34.6,34.7,90.1,0.5,124.3c-34.4,34.4-89.8,34-124.3-0.5L500,623.8z"
        fill="white"
      />
    </svg>
  );
}
