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

export default function NotePadPencilSvg(props: EditSvgProps): ReactElement {
  let { height, width } = props;
  if (!height) height = 20;
  if (!width) width = 20;
  return (
    <svg
      version="1.1"
      id="Uploaded to svgrepo.com"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <style type="text/css"> </style>{' '}
        <path
          className="linesandangles_een"
          d="M19,11H9V9h10V11z M23,19.414V27H5V5h18v3.586L28.414,14L23,19.414z M23.086,16.5L20.5,13.914 l-4.5,4.5V21h2.586L23.086,16.5z M23,11.414L21.914,12.5l2.586,2.586L25.586,14L23,11.414z M21,21.414L19.414,23H9v-2h5v-2H9v-2 h5.586l2-2H9v-2h9.586L21,10.586V7H7v18h14V21.414z"
        ></path>{' '}
      </g>
    </svg>
  );
}
