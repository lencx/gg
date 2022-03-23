import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '@layouts/base';
import useSite from '@hooks/useSite';
import IssuesList from '@comps/issues_list';
import { fmtURI } from '@utils/tools';
import '@styles/labels.scss';

export default function BlogCategory(props: any) {
  const labelsInfo = props.pageContext.labels;
  const { repo } = useSite();
  const labelsLink = `${repo}/discussions?discussions_q=label:"${fmtURI(
    labelsInfo.name
  )}"`;

  return (
    <Layout className="labels-page" title={`${labelsInfo.name} | Labels`}>
      <div className="markdown-body">
        <Link
          to={labelsLink}
          className="labels-head"
          style={{ background: `#${labelsInfo.color}` }}
          target="_blank"
        >
          {labelsInfo.name}
        </Link>

        <IssuesList data={props.data} pageContext={props.pageContext} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query DevLabelsQuery($name: String!) {
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
