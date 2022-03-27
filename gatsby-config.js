const ggConfig = require('./gg.config.json');

module.exports = {
  pathPrefix: ggConfig.pathPrefix,
  siteMetadata: {
    userLogo: ggConfig.siteMetadata.userLogo,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `discussions`,
        path: `${__dirname}/discussions`,
        ignore: [
          // `${__dirname}/discussions/rgd.json`,
          `${__dirname}/discussions/rgd.yml`,
          `${__dirname}/discussions/feed.xml`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@src': 'src',
          '@comps': 'src/components',
          '@layouts': 'src/layouts',
          '@pages': 'src/pages',
          '@styles': 'src/styles',
          '@hooks': 'src/hooks',
          '@templates': 'src/templates',
          '@utils': 'src/utils',
          '@icons': 'src/icons',
        },
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: ggConfig.manifest,
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          importWorkboxFrom: `cdn`,
        },
      },
    },
  ],
};
