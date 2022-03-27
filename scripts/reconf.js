const fs = require('fs');
const chalk = require('chalk');
const fetch = require('node-fetch');

const ggConf = require('../gg.config.json');
const pkg = require('../package.json');

let rgdConf;

try {
  rgdConf = require('../discussions/rgd.json');
} catch (e) {
  console.log(
    `Please create an issues in the github discussions titled ${chalk.green`rgd.yml`} and add the following to a comment.`
  );
  console.log(chalk.yellow`
\`\`\`yml
### repo ###
owner: <github_username>
repo: <github_repo>

# domain name
cname: <CNAME>

### website ###
website:
  # size: 40x40
  logo: <log_url>
  title: <site_title>
  description: <site_description>
\`\`\`
`);
  process.exit();
}

init().catch(function (e) {
  console.log(e);
});

// gg.config.json
async function updateGGConfig() {
  // manifest
  if (rgdConf.manifest) {
    const { icon, ...rest } = rgdConf.manifest || {};
    ggConf.manifest = {
      ...ggConf.manifest,
      ...rest,
    };
    // download pwa logo
    download(icon, 'pwa-logo');
    if (icon) {
      ggConf.manifest.icon = `src/static/pwa-logo.png`;
    }
  }

  // pathPrefix
  // https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/
  isRoot = rgdConf.repo === `${rgdConf.owner}.github.io`;
  if (rgdConf.cname || isRoot) {
    ggConf.pathPrefix = `/`;
  } else {
    ggConf.pathPrefix = `/${rgdConf.repo}`;
  }

  // download logo
  await download(rgdConf?.website?.logo || rgdConf.logo, 'logo', function () {
    ggConf.siteMetadata.userLogo = true;
  });
  fs.writeFile(
    'gg.config.json',
    JSON.stringify(ggConf, null, 2),
    function (err) {
      if (err) return;
      console.log(chalk.gray`[init]`, chalk.yellow`gg.config.json`);
    }
  );
}

async function download(url, name, callback) {
  if (/^https?:\/\//.test(url)) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    try {
      fs.writeFileSync(`src/static/${name}.png`, buffer);
      callback && callback();
      console.log(chalk.gray`[init]`, chalk.yellow`${name}.png`);
    } catch (e) {}
  }
}

function cnameUpdate() {
  if (rgdConf.cname) {
    try {
      fs.writeFileSync(`CNAME`, rgdConf.cname);
      console.log(chalk.gray`[init]`, chalk.yellow`CNAME`);
    } catch (e) {}
  }
}

// package.json
function pkgUpdate() {
  pkg.name = rgdConf.repo;
  pkg.description = rgdConf.description || rgdConf.website?.description;

  fs.writeFile('package.json', JSON.stringify(pkg, null, 2), (err) => {
    if (err) return;
    console.log(chalk.gray`[init]`, chalk.yellow`package.json`);
  });
}

async function init() {
  updateGGConfig();
  cnameUpdate();
  pkgUpdate();
}
