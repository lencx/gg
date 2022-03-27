import React, { FC, useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import NavIcon from './NavIcon';
import NavScreen from './NavScreen';
import './index.scss';

interface NavProps {}

const Nav: FC<NavProps> = () => {
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
    <div className="gg-nav">
      <NavIcon isActive={isToggle} onClick={handleToggle} />
      <NavScreen isHide={isToggle} />
    </div>
  );
};

export default Nav;
