import { useStaticQuery, graphql } from 'gatsby';

export default function usePrefix() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          assetPrefix
        }
      }
    }
  `);
  return data.site.siteMetadata.assetPrefix;
}
