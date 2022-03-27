import useRgd from './useRgd';

export default function useRepoLink() {
  const { type, owner, repo, issues_owner, issues_repo, cname } = useRgd();

  let repoLink, repoType, dataRepo, repoTxt;
  const siteRepo = `https://github.com/${owner}/${repo}`;
  let rssLink = '/feed.xml';
  if (type === 'issues') {
    dataRepo = `https://github.com/${issues_owner}/${issues_repo}`;
    repoLink = `${dataRepo}/issues`;
    repoType = 'issues';
    repoTxt = `${issues_owner}/${issues_repo}`;
  } else {
    dataRepo = siteRepo;
    repoLink = `${dataRepo}/discussions`;
    repoType = 'discussions';
    repoTxt = `${owner}/${repo}`;
  }

  if (!/\.github\.io$/.test(repo) && !cname) {
    rssLink = `/${repo}/feed.xml`;
  }

  return { repoLink, repoType, dataRepo, siteRepo, rssLink, repoTxt }
}
