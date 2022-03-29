import React, { FC } from 'react';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import { Icon } from '@iconify/react/dist/offline';
import iconGh from '@iconify-icons/mdi/github';
import iconRss from '@iconify-icons/mdi/rss';
import iconCategory from '@iconify-icons/bxs/category';
import iconTags from '@iconify-icons/mdi/tag-multiple';
import iconArchive from '@iconify-icons/mdi/archive';

import useRepoLink from '@hooks/useRepoLink';
import ThemeSwitch from '@comps/theme_switch';
import { go } from '@utils/tools';

interface NavScreenProps {
  isHide: boolean;
}

const NavScreen: FC<NavScreenProps> = ({ isHide }) => {
  const { repoType, dataRepo, rssLink } = useRepoLink();

  return (
    <div className={clsx('nav-screen', { open: isHide })}>
      <div>
        <nav>
          {repoType !== 'issues' && (
            <li onClick={() => navigate(`/category`)}>
              <Icon
                className="icon-action"
                icon={iconCategory}
                fontSize="20"
                color="var(--gg-icon)"
              />
              Category
            </li>
          )}
          <li onClick={() => navigate(`/labels`)}>
            <Icon
              className="icon-action"
              icon={iconTags}
              fontSize="20"
              color="var(--gg-icon)"
            />
            Labels
          </li>
          {repoType === 'issues' && (
            <li onClick={() => navigate(`/archives`)}>
              <Icon
                className="icon-action"
                icon={iconArchive}
                fontSize="20"
                color="var(--gg-icon)"
              />
              Archives
            </li>
          )}
        </nav>
        <div className="icons">
          <ThemeSwitch />
          <Icon
            className="icon-action"
            icon={iconRss}
            fontSize="20"
            color="var(--gg-icon)"
            onClick={() => go(rssLink)}
          />
          <Icon
            className="icon-action"
            icon={iconGh}
            fontSize="20"
            color="var(--gg-icon)"
            onClick={() => go(dataRepo)}
          />
        </div>
      </div>
    </div>
  );
};

export default NavScreen;
