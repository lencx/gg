import React, { FC } from 'react';
import { Link } from 'gatsby';

import { fmtIssues } from '@utils/tools';

import './index.scss';

interface IssuesNumProps {
  repo: string;
  number: number;
  len?: number;
}

const IssuesNum: FC<IssuesNumProps> = (props) => {
  const issuesLink = `${props.repo}/discussions/${props.number}`;
  return (
    <Link className="number issues-num" to={issuesLink} target="_blank">
      {props.len ? fmtIssues(props.number, props.len) : `#${props.number}`}
    </Link>
  );
};

export default IssuesNum;
