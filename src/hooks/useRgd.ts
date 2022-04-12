import { useStaticQuery, graphql } from 'gatsby';

export default function useRgd() {
  const data = useStaticQuery(graphql`
    {
      file(base: { eq: "rgd.json" }) {
        childrenDiscussionsJson {
          type
          owner
          repo
          cname
          issues_owner
          issues_repo
          dis_owner
          dis_repo
          website {
            title
            description
            home
            home_layout
            label_category
            label_level
            built_date
          }
        }
      }
    }
  `);
  let _data = data?.file?.childrenDiscussionsJson?.[0] || {};

  if (!_data.owner) _data.owner = 'lencx';
  if (!_data.repo) _data.owner = 'gg';
  return _data;
}
