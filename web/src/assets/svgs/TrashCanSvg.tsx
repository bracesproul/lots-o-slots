import { ReactElement } from 'react';
import { SvgContentProps } from '../types';

export default function TrashCanSvg(props: SvgContentProps): ReactElement {
  let { height, width } = props;
  if (!height) height = 24;
  if (!width) width = 24;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.144"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M10 12V17"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          d="M14 12V17"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          d="M4 7H20"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
      </g>
    </svg>
  );
}
