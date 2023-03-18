import { ReactElement } from 'react';
import { SvgContentProps } from '../types';

type EditSvgProps = SvgContentProps & {
  /**
   * Fill color of the svg
   * @default #FFFFFF
   */
  fill?: string;
};

// https://www.svgrepo.com/svg/36160/edit-button?edit=true

export default function CircleCheckMarkSvg(props: EditSvgProps): ReactElement {
  let { height, width } = props;
  if (!height) height = 20;
  if (!width) width = 20;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M9.5 12.1316L11.7414 14.5L16 10M20.5 12.5C20.5 16.9183 16.9183 20.5 12.5 20.5C8.08172 20.5 4.5 16.9183 4.5 12.5C4.5 8.08172 8.08172 4.5 12.5 4.5C16.9183 4.5 20.5 8.08172 20.5 12.5Z"
          stroke="#00FF00"
          strokeWidth="1.2"
        ></path>{' '}
      </g>
    </svg>
  );
}
