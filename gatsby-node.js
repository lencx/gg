const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const slugify = require('slugify');

const fmtURI = (uri, isSlugify) =>
  isSlugify
    ? slugify(uri, { lower: true, remove: /[*+~.()'"!:@]/g })
    : uri.toLocaleLowerCase().replace(/ /g, '+');

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allDiscussionsJson {
        edges {
          previous {
            node {
              title
              number
            }
          }
          next {
            node {
              title
              number
            }
          }
          node {
            node {
              title
              number
              category {
                name
                emoji
                description
                isAnswerable
              }
              labels {
                edges {
                  node {
                    color
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  let categoryMap = new Map();
  let labelsMap = new Map();
  let nlen = 0;

  data?.allDiscussionsJson?.edges?.forEach(({ previous, next, node }) => {
    const curr = node.node;
    const number = curr.number;

    // number length
    const _nlen = `${number}`.length;
    if (nlen < _nlen) nlen = _nlen;

    // create issues pages
    actions.createPage({
      path: `issues/${number}`,
      component: require.resolve(`./src/templates/issues.tsx`),
      context: { number, previous: previous?.node, next: next?.node },
    });

    // category
    const category = curr?.category;
    if (category && !categoryMap.get(category?.name)) {
      categoryMap.set(category?.name, category);
    }

    // labels
    const labels = curr?.labels?.edges;
    labels &&
      labels.forEach((label) => {
        if (!labelsMap.get(label.node.name)) {
          labelsMap.set(label.node.name, label.node);
        }
      });
  });

  // create category pages
  for (let [key, value] of categoryMap.entries()) {
    actions.createPage({
      path: `category/${fmtURI(key, true)}`,
      component: require.resolve(`./src/templates/category.tsx`),
      context: { category: value, name: key, nlen },
    });
  }

  // create labels pages
  for (let [key, value] of labelsMap.entries()) {
    actions.createPage({
      path: `labels/${fmtURI(key)}`,
      component: require.resolve(`./src/templates/labels.tsx`),
      context: { labels: value, name: key, nlen },
    });
  }

  // categories page
  actions.createPage({
    path: `category`,
    component: require.resolve(`./src/templates/nav-category.tsx`),
    context: { categoryList: Array.from(categoryMap.values()) },
  });

  // labels page
  actions.createPage({
    path: `labels`,
    component: require.resolve(`./src/templates/nav-labels.tsx`),
    context: { labelsList: Array.from(labelsMap.values()) },
  });
};

// Fix warn chunk commons [mini-css-extract-plugin] error in Gatsby JS
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude:
          /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type DiscussionsJsonNode {
      category: Category
      labels: LabelsConnection
    }

    type Category {
      name: String!
      emoji: String!
      description: String!
      isAnswerable: Boolean!
    }

    type LabelsConnection {
      edges: [LabelsEdge]
    }
    type LabelsEdge {
      node: Labels!
    }
    type Labels {
      id: String
      name: String
      color: String
    }

    type IssuesJson implements Node {
      labels: LabelsConnection
      author: Author!
      comments: CommentsConnection
    }

    type CommentsConnection {
      edges: [CommentsEdge]
    }
    type CommentsEdge {
      node: IssuesJsonCommentsEdgesNode
    }

    type IssuesJsonCommentsEdgesNode {
      id: String!
      bodyHTML: String!
      author: Author!
      replies: RepliesConnection
    }
    type RepliesConnection {
      edges: [RepliesEdge]
    }
    type RepliesEdge {
      node: Replies!
    }
    type Replies {
      id: String!
      bodyHTML: String!
      author: Author!
    }
    type Author {
      login: String!
      avatarUrl: String!
      url: String!
    }
  `;
  createTypes(typeDefs);
};
