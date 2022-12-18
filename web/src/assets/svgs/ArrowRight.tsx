import { ReactElement } from 'react';
import { SvgContentProps } from '../types';

export default function ArrowRight(props: SvgContentProps): ReactElement {
  let { height, width } = props;
  if (!height) height = 14;
  if (!width) width = 15;
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
        d="M 8.315 0.026 C 8.199 0.078 8.122 0.199 8.122 0.334 L 8.122 3.99 L 0.312 3.99 C 0.14 3.99 -4.31e-07 4.14 -4.23e-07 4.324 L-1.896e-07 9.662 C-1.816e-07 9.847 0.14 9.996 0.312 9.996 L 8.122 9.996 L 8.122 13.666 C 8.122 13.801 8.199 13.923 8.315 13.975 C 8.432 14.026 8.566 13.998 8.655 13.903 L 14.908 7.246 C 14.967 7.183 15 7.099 15 7.01 C 15 6.921 14.967 6.836 14.909 6.774 L 8.656 0.098 C 8.566 0.002 8.432 -0.026 8.315 0.026 Z"
        fill="#45FF8F"
      />
    </svg>
  );
}
