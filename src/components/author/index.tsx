import React, { FC } from 'react';

import { go, fmtDate } from '@utils/tools';

import './index.scss';

interface AuthorProps {
  author: any;
  date?: Date;
  extra?: React.ReactNode;
}

const Author: FC<AuthorProps> = (props) => {
  const author = props.author;
  return (
    <div className="author-info">
      <span
        className="author"
        title={author.url}
        onClick={() => go(author.url)}
      >
        <img src={author.avatarUrl} alt={author.login} />
        <span>{author.login}</span>
      </span>
      {props.date && <i className="date">{fmtDate(props.date)}</i>}
      {props.extra}
    </div>
  );
};

export default Author;
