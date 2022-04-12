import React, { FC } from 'react';
import clsx from 'clsx';

import { fmtIssues } from '@utils/tools';
import useRgd from '@hooks/useRgd';

import './index.scss';

interface IssuesNumProps {
  number: number;
  len?: number;
  className?: string;
}

const IssuesNum: FC<IssuesNumProps> = (props) => {
  const rgdData = useRgd();

  let _link;
  switch (rgdData.type) {
    case 'issues':
      _link = `https://github.com/${rgdData.issues_owner}/${rgdData.issues_repo}/issues/${props.number}`;
      break;
    case 'discussions2':
      _link = `https://github.com/${rgdData.dis_owner}/${rgdData.dis_repo}/discussions/${props.number}`;
      break;
    default:
      _link = `https://github.com/${rgdData.owner}/${rgdData.repo}/discussions/${props.number}`;
  }

  return (
    <a
      className={clsx('number issues-num', props.className)}
      href={_link}
      target="_blank"
    >
      {props.len ? fmtIssues(props.number, props.len) : `#${props.number}`}
    </a>
  );
};

export default IssuesNum;
