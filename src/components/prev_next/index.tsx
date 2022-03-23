import React, { FC } from 'react';
import { Link } from 'gatsby';
import { Icon } from '@iconify/react/dist/offline';
import iconPrev from '@iconify-icons/mdi/page-previous-outline';
import iconNext from '@iconify-icons/mdi/page-next-outline';

import './index.scss';

interface PrevNextProps {
  next: any;
  previous: any;
}

const PrevNext: FC<PrevNextProps> = (props) => {
  const prev = props.previous;
  const next = props.next;

  return (
    <div className="gg-issues-prev-next">
      {prev && (
        <Link className="prev" to={`/issues/${prev.number}`}>
          <span>
            <Icon className="icon-action" icon={iconPrev} fontSize="20" />
            {prev.title}
          </span>
        </Link>
      )}
      {next && (
        <Link className="next" to={`/issues/${next.number}`}>
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
