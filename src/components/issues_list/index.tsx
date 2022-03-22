import React, { FC } from 'react';
import { Link } from 'gatsby';

import IssuesNum from '@comps/issues_num';
import { go, fmtIssues } from '@utils/tools';

import './index.scss';

interface IssuesListProps {
  data: any;
  pageContext: any;
}

const IssuesList: FC<IssuesListProps> = (props) => {
  const data = props.data.allDiscussionsJson.nodes;
  const nlen = props.pageContext.nlen;
  const repo = props.data.site.siteMetadata.repo;

  return (
    <div className="issues-list">
      {data.map(({ node }: any) => {
        return (
          <div key={node.number} className="issues-item">
            <IssuesNum repo={repo} number={node.number} len={nlen} />
            <Link className="title" to={`/issues/${node.number}`}>
              {node.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default IssuesList;
