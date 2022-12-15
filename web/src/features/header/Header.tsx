import { ReactElement } from 'react';
import { Button } from '@/components';

export default function Header(): ReactElement {
  return (
    <div className="header">
      <div className="nav-container">
        <h2 className="lots-o-slots-logo">
          Lots <span className="red-span-text">{`O'`}</span> Slots
        </h2>
        <div className="nav-button-group">
          <Button type="button" variant="secondary">
            Generate Account
          </Button>
          <Button type="button" variant="primary">
            Play Now!
          </Button>
        </div>
      </div>
      <div className="title-container">
        <h1 className="header-text-top">Deposit</h1>
        <h1 className="header-text-bottom">& Play Now!</h1>
      </div>
    </div>
  );
}
