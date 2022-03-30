const fs = require('fs');
const chalk = require('chalk');

const pkg = require('../package.json');

init().catch(function (e) {
  console.log(e);
});

// gg.config.json
async function ggConfReset() {
  fs.copyFileSync('scripts/gg.config.bak.json', 'gg.config.json');
  console.log(chalk.gray`[reset]`, chalk.yellow`gg.config.json`);
}

// logo
async function logoReset() {
  fs.copyFileSync('src/static/logo.bak.png', 'src/static/logo.png');
  console.log(chalk.gray`[reset]`, chalk.yellow`logo.png`);
  fs.copyFileSync('src/static/logo.bak.png', 'src/static/pwa-logo.png');
  console.log(chalk.gray`[reset]`, chalk.yellow`pwa-logo.png`);
}

// CNAME
function cnameReset() {
  if (fs.existsSync('CNAME')) {
    fs.unlinkSync('CNAME');
    console.log(chalk.gray`[reset]`, chalk.yellow`CNAME`);
  }
}

// package.json
function pkgReset() {
  pkg.name = 'gg';
  pkg.description = 'A gatsby website builder based on github discussions';
  pkg.scripts.posts = 'yarn post:base';

  fs.writeFile('package.json', JSON.stringify(pkg, null, 2), function (err) {
    if (err) return;
    console.log(chalk.gray`[reset]`, chalk.yellow`package.json`);
  });
}

async function init() {
  ggConfReset();
  pkgReset();
  logoReset();
  cnameReset();
}
