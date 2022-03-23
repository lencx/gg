const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const slugify = require('slugify');

const fmtURI = (uri, isSlugify) =>
  isSlugify
    ? slugify(uri, { lower: true, remove: /[*+~.()'"!:@]/g })
    : uri.toLocaleLowerCase().replace(/ /g, '+');

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      site {
        siteMetadata {
          assetPrefix
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

  let prefix = data.site.siteMetadata.assetPrefix;

  // index page
  actions.createPage({
    path: `${prefix}`,
    component: require.resolve(`./src/templates/index.tsx`),
  });

  // 404 page
  actions.createPage({
    path: `${prefix}404`,
    component: require.resolve(`./src/templates/404.tsx`),
  });

  data.allDiscussionsJson.edges.forEach(({ previous, next, node }) => {
    const curr = node.node;
    const number = curr.number;

    // number length
    const _nlen = `${number}`.length;
    if (nlen < _nlen) nlen = _nlen;

    // create issues pages
    actions.createPage({
      path: `${prefix}issues/${number}`,
      component: require.resolve(`./src/templates/issues.tsx`),
      context: { number, previous: previous?.node, next: next?.node },
    });

    // category
    const category = curr.category;
    if (!categoryMap.get(category.name)) {
      categoryMap.set(category.name, category);
    }

    // labels
    const labels = curr.labels.edges;
    labels.forEach((label) => {
      if (!labelsMap.get(label.node.name)) {
        labelsMap.set(label.node.name, label.node);
      }
    });
  });

  // create category pages
  for (let [key, value] of categoryMap.entries()) {
    actions.createPage({
      path: `${prefix}category/${fmtURI(key, true)}`,
      component: require.resolve(`./src/templates/category.tsx`),
      context: { category: value, name: key, nlen },
    });
  }

  // create labels pages
  for (let [key, value] of labelsMap.entries()) {
    actions.createPage({
      path: `${prefix}labels/${fmtURI(key)}`,
      component: require.resolve(`./src/templates/labels.tsx`),
      context: { labels: value, name: key, nlen },
    });
  }

  // categories page
  actions.createPage({
    path: `${prefix}category`,
    component: require.resolve(`./src/templates/nav-category.tsx`),
    context: { categoryList: Array.from(categoryMap.values()) },
  });

  // labels page
  actions.createPage({
    path: `${prefix}labels`,
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
