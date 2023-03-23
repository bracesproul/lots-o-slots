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

export default function RedoCircleSvg(props: EditSvgProps): ReactElement {
  let { height, width } = props;
  if (!height) height = 20;
  if (!width) width = 20;
  return (
    <svg
      fill="#00008B"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M7.94.56a8.05 8.05 0 0 1 6.82 3.64V1.55H16V5a1.16 1.16 0 0 1-1.15 1.15h-3.44V4.9h2.32a6.79 6.79 0 0 0-5.79-3.1A6.48 6.48 0 0 0 1.24 8a6.48 6.48 0 0 0 6.7 6.2 6.48 6.48 0 0 0 6.7-6.2h1.24a7.71 7.71 0 0 1-7.94 7.44A7.71 7.71 0 0 1 0 8 7.71 7.71 0 0 1 7.94.56z"></path>
      </g>
    </svg>
  );
}
