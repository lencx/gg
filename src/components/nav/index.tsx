import React, { FC, useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import NavIcon from './NavIcon';
import NavScreen from './NavScreen';
import './index.scss';

interface NavProps {
  siteMetadata: any;
}

const Nav: FC<NavProps> = ({ siteMetadata }) => {
  const [isToggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!isToggle);

    const body: any = document.querySelector('body');

    if (!isToggle) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  };

  useEffect(() => {
    if (!isToggle) {
      enableBodyScroll(document.querySelector('body') as any);
    }
  }, []);

  return (
    <div className="dev-nav">
      <NavIcon isActive={isToggle} onClick={handleToggle} />
      {/* <span className="nav-icon" onClick={handleToggle}>
        menu
      </span> */}
      <NavScreen isHide={isToggle} siteMetadata={siteMetadata} />
    </div>
  );
};

export default Nav;
