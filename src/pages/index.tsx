import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '@layouts/base';
import Author from '@comps/author';
import Category from '@comps/category';
import IssuesNum from '@comps/issues_num';
import '@styles/home.scss';

export default function IndexPage(props: any) {
  const repo = props.data.site.siteMetadata.repo;

  return (
    <Layout className="home-page">
      <div className="markdown-body issues-list">
        <div>
          {props.data.allDiscussionsJson.nodes.map(({ node }: any) => {
            const category = node.category;

            return (
              <div className="item" key={node.number}>
                <Author
                  author={node.author}
                  date={node.updatedAt}
                  extra={<IssuesNum repo={repo} number={node.number} />}
                />
                <div className="post-info">
                  <Category data={category} />
                  <Link className="title" to={`/issues/${node.number}`}>
                    {node.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  {
    site {
      siteMetadata {
        repo
      }
    }
    allDiscussionsJson {
      nodes {
        node {
          number
          title
          updatedAt
          author {
            avatarUrl
            login
            url
          }
          category {
            name
            isAnswerable
            emoji
          }
        }
      }
    }
  }
`;
