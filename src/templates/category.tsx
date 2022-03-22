import React from 'react';
import { graphql } from 'gatsby';

import Layout from '@layouts/base';
import IssuesList from '@comps/issues_list';
import Category from '@comps/category';
import '@styles/category.scss';

export default function BlogCategory(props: any) {
  const categoryInfo = props.pageContext.category;
  const repo = props.data.site.siteMetadata.repo;
  const categoriesLink = `${repo}/discussions/categories/${categoryInfo.name}`
    .toLocaleLowerCase()
    .replace(/ /g, '-');

  return (
    <Layout className="category-page">
      <div className="markdown-body">
        <div className="category-head" title={categoriesLink}>
          <Category data={categoryInfo} />
          <span className="desc">{categoryInfo.description}</span>
        </div>

        <IssuesList data={props.data} pageContext={props.pageContext} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query DevCategoryQuery($name: String!) {
    site {
      siteMetadata {
        repo
      }
    }
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
