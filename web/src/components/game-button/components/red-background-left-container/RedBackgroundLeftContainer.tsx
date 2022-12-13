import { ReactElement } from 'react';
import { BackgroundContainerProps } from '../../types';

export default function RedBackgroundLeftContainer(
  props: BackgroundContainerProps
): ReactElement {
  const { icon } = props;
  return (
    <div className={'bg-container'}>
      <div className={'icon-container'}>{icon}</div>
    </div>
  );
}
