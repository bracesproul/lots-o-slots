import { SvgIconProps } from '../types';

export default function LinkIcon(props: SvgIconProps) {
  let { fill } = props;
  if (!fill) {
    fill = 'white';
  }
  return (
    <>
      <path
        d="M 13.197 1.51 L 8.726 5.982 C 8.717 5.99 8.712 6.001 8.703 6.009 C 9.805 5.849 10.937 5.959 11.986 6.368 L 15.02 3.333 C 16.026 2.328 17.661 2.328 18.666 3.333 C 19.672 4.339 19.672 5.974 18.666 6.979 C 18.495 7.151 13.936 11.709 14.195 11.451 C 13.182 12.464 11.519 12.421 10.549 11.451 C 10.046 10.948 9.228 10.948 8.726 11.451 L 7.943 12.233 C 8.16 12.602 8.409 12.957 8.726 13.274 C 10.635 15.183 13.922 15.336 15.99 13.296 C 15.999 13.288 16.009 13.282 16.018 13.274 L 20.489 8.802 C 22.503 6.788 22.503 3.524 20.489 1.51 C 18.476 -0.503 15.211 -0.503 13.197 1.51 V 1.51 Z"
        fill={fill}
      />
      <path
        d="M 10.024 15.622 L 6.979 18.666 C 5.974 19.672 4.339 19.672 3.333 18.666 C 2.328 17.661 2.328 16.026 3.333 15.02 C 3.505 14.849 8.073 10.281 7.814 10.539 C 8.828 9.526 10.49 9.569 11.46 10.539 C 11.963 11.042 12.781 11.042 13.283 10.539 L 14.066 9.757 C 13.849 9.388 13.6 9.033 13.283 8.716 C 11.378 6.81 8.093 6.648 6.019 8.694 C 6.011 8.702 6 8.708 5.991 8.716 L 1.51 13.198 C-0.503 15.211 -0.503 18.476 1.51 20.489 C 3.524 22.503 6.789 22.503 8.802 20.489 L 13.283 16.008 C 13.292 15.999 13.297 15.989 13.306 15.98 C 12.204 16.141 11.073 16.031 10.024 15.622 V 15.622 Z"
        fill={fill}
      />
    </>
  );
}