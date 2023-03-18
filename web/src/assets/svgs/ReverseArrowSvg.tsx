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

export default function ReverseArrowSvg(props: EditSvgProps): ReactElement {
  let { height, width } = props;
  if (!height) height = 20;
  if (!width) width = 20;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
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
          d="M4 7H14C17.3137 7 20 9.68629 20 13C20 16.3137 17.3137 19 14 19H4M4 7L8 3M4 7L8 11"
          stroke="#FFA500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
      </g>
    </svg>
  );
}
