import { ReactElement } from 'react';
import { SvgContentProps } from '../types';

type RightArrowButtonType = SvgContentProps & {
  includeLine?: boolean;
};

export default function RightArrowButton(
  props: RightArrowButtonType
): ReactElement {
  let { height, width } = props;
  if (!height) height = 49;
  if (!width) width = 49;
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
        d="M12.314,47.255c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l21.92-21.92l-21.92-21.92
		c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L35.648,22.92c0.391,0.391,0.391,1.023,0,1.414L13.021,46.962
		C12.825,47.157,12.57,47.255,12.314,47.255z"
        fill="white"
      />
    </svg>
  );
}
