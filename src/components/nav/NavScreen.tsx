import React, { FC } from 'react';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import { Icon } from '@iconify/react/dist/offline';
import iconGh from '@iconify-icons/mdi/github';
import iconRss from '@iconify-icons/mdi/rss';
import iconCategory from '@iconify-icons/bxs/category';
import iconTags from '@iconify-icons/mdi/tag-multiple';

import ThemeSwitch from '@comps/theme_switch';
import { go } from '@utils/tools';

interface NavScreenProps {
  isHide: boolean;
  siteMetadata: any;
}

const NavScreen: FC<NavScreenProps> = ({ isHide, siteMetadata }) => {
  return (
    <div className={clsx('nav-screen', { open: isHide })}>
      <div>
        <nav>
          <li onClick={() => navigate('/category')}>
            <Icon
              className="icon-action"
              icon={iconCategory}
              fontSize="20"
              color="var(--gg-icon)"
            />
            Category
          </li>
          <li onClick={() => navigate('/labels')}>
            <Icon
              className="icon-action"
              icon={iconTags}
              fontSize="20"
              color="var(--gg-icon)"
            />
            Labels
          </li>
        </nav>
        <div className="icons">
          <ThemeSwitch />
          <Icon
            className="icon-action"
            icon={iconRss}
            fontSize="20"
            color="var(--gg-icon)"
            onClick={() => go(siteMetadata.rss)}
          />
          <Icon
            className="icon-action"
            icon={iconGh}
            fontSize="20"
            color="var(--gg-icon)"
            onClick={() => go(siteMetadata.repo)}
          />
        </div>
      </div>
    </div>
  );
};

export default NavScreen;
