import { useStaticQuery, graphql } from 'gatsby';

export default function useIssuesList() {
  const data = useStaticQuery(graphql`
    {
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
            labels {
              edges {
                node {
                  id
                  name
                  color
                  description
                }
              }
            }
          }
        }
      }
    }
  `);
  let list = data?.allDiscussionsJson?.nodes || [];
  const newlist: any = [];
  list.forEach((i: any) => {
    let labels = i?.node?.labels?.edges;
    const _labels = labels ? labels.map((j: any) => j.node) : [];
    if (i.node) newlist.push({ ...i.node, labels: _labels });
  });
  return newlist;
}
