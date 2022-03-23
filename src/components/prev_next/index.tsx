import React, { FC } from 'react';
import { Link } from 'gatsby';
import { Icon } from '@iconify/react/dist/offline';
import iconPrev from '@iconify-icons/mdi/page-previous-outline';
import iconNext from '@iconify-icons/mdi/page-next-outline';

import usePrefix from '@hooks/usePrefix';

import './index.scss';

interface PrevNextProps {
  next: any;
  previous: any;
}

const PrevNext: FC<PrevNextProps> = (props) => {
  const prefix = usePrefix();
  const prev = props.previous;
  const next = props.next;

  return (
    <div className="gg-issues-prev-next">
      {prev && (
        <Link className="prev" to={`${prefix}issues/${prev.number}`}>
          <span>
            <Icon className="icon-action" icon={iconPrev} fontSize="20" />
            {prev.title}
          </span>
        </Link>
      )}
      {next && (
        <Link className="next" to={`${prefix}issues/${next.number}`}>
          <span>
            {next.title}
            <Icon className="icon-action" icon={iconNext} fontSize="20" />
          </span>
        </Link>
      )}
    </div>
  );
};

export default PrevNext;
