import React from 'react';
import { graphql } from 'gatsby';

import Layout from '@layouts/base';
import useRepoLink from '@hooks/useRepoLink';
import IssuesList from '@comps/issues_list';
import { fmtURI } from '@utils/tools';
import '@styles/labels.scss';

export default function BlogCategory(props: any) {
  const labelsInfo = props.pageContext.labels;
  const { repoLink, repoType } = useRepoLink();
  // issues label: https://github.com/lencx/gg/issues?q=label:
  // discussions label: https://github.com/lencx/gg/discussions?discussions_q=label:
  let labelsLink;
  if (repoType === 'issues') {
    labelsLink = `${repoLink}?q=label:${fmtURI(labelsInfo.name)}`;
  } else {
    labelsLink = `${repoLink}?discussions_q=label:"${fmtURI(labelsInfo.name)}"`;
  }

  return (
    <Layout className="labels-page" title={`${labelsInfo.name} | Labels`}>
      <div className="markdown-body">
        <a
          href={labelsLink}
          className="labels-head"
          style={{ background: `#${labelsInfo.color}` }}
          target="_blank"
        >
          {labelsInfo.name}
        </a>

        {labelsInfo.description && (
          <div className="label-desc">{labelsInfo.description}</div>
        )}

        <IssuesList data={props.data} pageContext={props.pageContext} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query GGLabelsQuery($name: String!) {
    allDiscussionsJson(
      filter: {
        node: {
          labels: { edges: { elemMatch: { node: { name: { eq: $name } } } } }
        }
      }
    ) {
      nodes {
        node {
          title
          number
        }
      }
    }
  }
`;
