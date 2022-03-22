import React, { FC } from 'react';

import { go, fmtIssues } from '@utils/tools';

import './index.scss';

interface IssuesNumProps {
  repo: string;
  number: number;
  len?: number;
}

const IssuesNum: FC<IssuesNumProps> = (props) => {
  const issuesLink = `${props.repo}/discussions/${props.number}`;
  return (
    <a className="number issues-num" href={issuesLink} target="_blank">
      {props.len ? fmtIssues(props.number, props.len) : `#${props.number}`}
    </a>
  );
};

export default IssuesNum;
