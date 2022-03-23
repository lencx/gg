import { useStaticQuery, graphql } from 'gatsby';

export default function useSite() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          rss
          repo
          title
          owner
          description
          userLogo
        }
      }
    }
  `);
  return data.site.siteMetadata;
}
