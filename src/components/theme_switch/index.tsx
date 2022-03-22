import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/offline';
import iconSun from '@iconify-icons/mdi/wb-sunny';
import iconMoon from '@iconify-icons/mdi/moon-and-stars';

import './index.scss';

const ThemeSwitch = () => {
  const [theme, setTheme] = useState('');
  const [isDark, setDark] = useState(false);
  const win: any = typeof window !== 'undefined' ? window : {};
  const _isDark = (theme || win.__theme) === 'dark';

  const handleChange = () => {
    const _theme = isDark ? 'light' : 'dark';
    setDark(_isDark);
    setTheme(_theme);
    win.__setPreferredTheme(_theme);
  };

  useEffect(() => {
    setTheme(win.__theme);
    setDark(_isDark);
  }, [win.__theme]);

  return (
    <Icon
      className="gg-theme-toggle icon-action"
      onClick={handleChange}
      icon={isDark ? iconMoon : iconSun}
      fontSize="20"
      color="var(--gg-icon)"
    />
  );
};

export default ThemeSwitch;
