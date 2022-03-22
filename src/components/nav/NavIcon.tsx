import React, { FC } from 'react';
import clsx from 'clsx';

interface NavIconProps {
  isActive: boolean;
  onClick?: () => void;
}

const NavIcon: FC<NavIconProps> = ({ isActive, onClick }) => {
  return (
    <span className={clsx('nav-icon', { active: isActive })} onClick={onClick}>
      <span className="top" />
      <span className="middle" />
      <span className="bottom" />
    </span>
  );
};

export default NavIcon;
