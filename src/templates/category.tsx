import React from 'react';
import { graphql } from 'gatsby';

import Layout from '@layouts/base';
import useRgd from '@hooks/useRgd';
import IssuesList from '@comps/issues_list';
import Category from '@comps/category';
import { fmtURI } from '@utils/tools';
import '@styles/category.scss';

export default function BlogCategory(props: any) {
  const { repo } = useRgd();
  const categoryInfo = props.pageContext.category;
  const categoriesLink = `${repo}/discussions/categories/${fmtURI(
    categoryInfo.name,
    true
  )}`;

  return (
    <Layout className="category-page" title={`${categoryInfo.name} | Category`}>
      <div className="markdown-body">
        <div className="category-head" title={categoriesLink}>
          <Category data={categoryInfo} go={categoriesLink} />
          <span className="desc">{categoryInfo.description}</span>
        </div>

        <IssuesList data={props.data} pageContext={props.pageContext} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query GGCategoryQuery($name: String!) {
    allDiscussionsJson(
      filter: { node: { category: { name: { eq: $name } } } }
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
