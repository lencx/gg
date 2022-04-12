import useRgd from './useRgd';

export default function useRepoLink() {
  const { type, owner, repo, issues_owner, issues_repo, dis_owner, dis_repo, cname } = useRgd();

  let repoLink, repoType, dataRepo, repoTxt;
  const siteRepo = `https://github.com/${owner}/${repo}`;
  let rssLink = '/feed.xml';

  switch (type) {
    case 'issues': {
      dataRepo = `https://github.com/${issues_owner}/${issues_repo}`;
      repoLink = `${dataRepo}/issues`;
      repoType = 'issues';
      repoTxt = `${issues_owner}/${issues_repo}`;
      break;
    }
    case 'discussions2': {
      dataRepo = `https://github.com/${dis_owner}/${dis_repo}`;
      repoLink = `${dataRepo}/discussions`;
      repoType = 'discussions';
      repoTxt = `${dis_owner}/${dis_repo}`;
      break;
    }
    default: {
      dataRepo = siteRepo;
      repoLink = `${dataRepo}/discussions`;
      repoType = 'discussions';
      repoTxt = `${owner}/${repo}`;
    }
  }

  if (!/\.github\.io$/.test(repo) && !cname) {
    rssLink = `/${repo}/feed.xml`;
  }

  return { repoLink, repoType, dataRepo, siteRepo, rssLink, repoTxt }
}
