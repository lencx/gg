const fs = require('fs');
const chalk = require('chalk');
const fetch = require('node-fetch');

const conf = require('../gatsby-config.bak');
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

### website ###
# domain name
cname: <CNAME>
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

// gatsby-config.js
async function gatsbyConfUpdate() {
  // manifest
  if (rgdConf.manifest) {
    conf.plugins.map((i) => {
      if (typeof i !== 'string' && i.resolve === 'gatsby-plugin-manifest') {
        const { icon, ...rest } = rgdConf.manifest || {};
        // download pwa logo
        download(icon, 'pwa-logo');
        i.options = {
          ...i.options,
          ...rest,
        };
        if (icon) {
          i.options.icon = `src/static/pwa-logo.png`;
        }
      }
    });
  }

  // pathPrefix
  // https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/
  isRoot = rgdConf.repo === `${rgdConf.owner}.github.io`;
  if (rgdConf.cname || isRoot) {
    conf.pathPrefix = `/`;
  } else {
    conf.pathPrefix = `/${rgdConf.repo}`;
  }

  // siteMetadata
  conf.siteMetadata.title = rgdConf.title;
  conf.siteMetadata.description = rgdConf.description;
  conf.siteMetadata.owner = rgdConf.owner;
  conf.siteMetadata.type = rgdConf.type;
  conf.siteMetadata.repo = `https://github.com/${rgdConf.owner}/${rgdConf.repo}`;

  // download logo
  await download(rgdConf.logo, 'logo', function () {
    conf.siteMetadata.userLogo = true;
  });

  const content = `module.exports = ${JSON.stringify(conf, null, 2)}`;
  fs.writeFile('gatsby-config.js', content, function (err) {
    if (err) return;
    console.log(chalk.gray`[init]`, chalk.yellow`gatsby-config.js`);
  });
}

// package.json
function pkgUpdate() {
  pkg.name = rgdConf.repo;
  pkg.description = rgdConf.description;
  let issuesInfo = '';
  if (rgdConf['issues-owner'] && rgdConf['issues-repo']) {
    issuesInfo = ` --issues-owner=${rgdConf['issues-owner']} --issues-repo=${rgdConf['issues-repo']}`;
  }
  pkg.scripts.posts = `rgd --owner=${rgdConf.owner} --repo=${rgdConf.repo} --mode=json,rss --jsonfmt=true --outdir=discussions${issuesInfo}`;

  fs.writeFile('package.json', JSON.stringify(pkg, null, 2), function (err) {
    if (err) return;
    console.log(chalk.gray`[init]`, chalk.yellow`package.json`);
  });
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

async function init() {
  gatsbyConfUpdate();
  cnameUpdate();
  pkgUpdate();
}
