module.exports = {
  siteMetadata: {
    title: `Gatsby GitHub Template`,
    description: `A gatsby website builder based on github discussions`,
    owner: `lencx`,
    repo: `https://github.com/lencx/gatsby-github-template`,
    rss: `/feed.xml`,
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
          `${__dirname}/discussions/rgd.json`,
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
      options: {
        name: `GG`,
        short_name: `G2`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#232629`,
        display: `standalone`,
        icon: `./src/static/pwa-logo.png`,
      },
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
