const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const slugify = require('slugify');

const fmtURI = (uri, isSlugify) =>
  isSlugify
    ? slugify(uri, { lower: true, remove: /[*+~.()'"!:@]/g })
    : uri.toLocaleLowerCase().replace(/ /g, '+');

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      file(base: { eq: "rgd.json" }) {
        childrenDiscussionsJson {
          website {
            description
            home
            title
          }
        }
      }
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
    }
  `);

  const websiteData = data?.file?.childrenDiscussionsJson?.[0]?.website;

  let categoryMap = new Map();
  let labelsMap = new Map();
  let labelsColorMap = {};
  let nlen = 0;

  data?.allDiscussionsJson?.edges?.forEach(({ previous, next, node }) => {
    if (!node) return;
    const curr = node.node;
    const number = curr?.number;

    if (!number) return;

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
          labelsColorMap[label.node.name] = label.node.color;
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

  if (websiteData?.home === 'issues-labels') {
    // create home pages
    actions.createPage({
      path: `/`,
      component: require.resolve(`./src/templates/labels-category.tsx`),
      context: { colorMap: labelsColorMap },
    });
    // create archives pages
    actions.createPage({
      path: `/archives`,
      component: require.resolve(`./src/templates/archives.tsx`),
    });
  } else {
    // create home pages
    actions.createPage({
      path: `/`,
      component: require.resolve(`./src/templates/archives.tsx`),
    });
  }
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

const initFields = (fields) =>
  fields.reduce((a, b) => {
    let _type = 'String!';
    let _field = b;
    let _val = '';
    if (Array.isArray(b)) {
      _field = b[0];
      _type = b[1];
      if (b[1] === '[String]!') _val = [];
      if (b[1] === 'Boolean!') _val = false;
    }
    return {
      ...a,
      [_field]: {
        type: _type,
        resolve: (v) => v[_field] || _val,
      },
    };
  }, {});

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    `type DiscussionsJsonNode {
      category: Category
      labels: LabelsConnection
    }`,
    `type Category {
      name: String!
      emoji: String!
      description: String!
      isAnswerable: Boolean!
    }`,
    `type LabelsConnection {
      edges: [LabelsEdge]
    }`,
    `type LabelsEdge {
      node: Labels
    }`,
    `type Labels {
      id: String
      name: String
      color: String
      description: String
    }`,
    `type IssuesJson implements Node {
      labels: LabelsConnection
      author: Author
      comments: CommentsConnection
      category: Category
      upvoteCount: Int
    }`,
    `type CommentsConnection {
      edges: [CommentsEdge]
    }`,
    `type CommentsEdge {
      node: IssuesJsonCommentsEdgesNode
    }`,
    `type IssuesJsonCommentsEdgesNode {
      id: String!
      bodyHTML: String!
      author: Author!
      replies: RepliesConnection
    }`,
    `type RepliesConnection {
      edges: [RepliesEdge]
    }`,
    `type RepliesEdge {
      node: Replies
    }`,
    `type Replies {
      id: String!
      bodyHTML: String!
      author: Author!
    }`,
    `type Author {
      login: String!
      avatarUrl: String!
      url: String!
    }`,
    schema.buildObjectType({
      name: 'DiscussionsJson',
      fields: {
        ...initFields([
          'owner',
          'repo',
          'issues_owner',
          'issues_repo',
          'dis_owner',
          'dis_repo',
          'cname',
          'type',
        ]),
        website: 'RgdWebsite',
      },
      interfaces: ['Node'],
    }),
    schema.buildObjectType({
      name: 'RgdWebsite',
      fields: initFields([
        'title',
        'description',
        'home',
        'built_date',
        ['home_layout', '[String]!'],
        ['label_category', '[String]!'],
        ['label_level', '[String]!'],
      ]),
    }),
  ];
  createTypes(typeDefs);
};
