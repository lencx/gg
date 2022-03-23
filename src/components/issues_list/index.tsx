import React, { FC } from 'react';
import { Link } from 'gatsby';

import IssuesNum from '@comps/issues_num';
import useSite from '@hooks/useSite';

import './index.scss';

interface IssuesListProps {
  data: any;
  pageContext: any;
}

const IssuesList: FC<IssuesListProps> = (props) => {
  const { repo } = useSite();
  const data = props.data.allDiscussionsJson.nodes;
  const nlen = props.pageContext.nlen;

  return (
    <div className="issues-list">
      {data.map(({ node }: any) => {
        return (
          <div key={node.number} className="issues-item">
            <IssuesNum repo={repo} number={node.number} len={nlen} />
            <Link className="title" to={`issues/${node.number}`}>
              {node.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default IssuesList;
