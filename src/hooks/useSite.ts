import { useStaticQuery, graphql } from 'gatsby';

export default function useSite() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          userLogo
        }
      }
    }
  `);
  return data?.site?.siteMetadata || {};
}
