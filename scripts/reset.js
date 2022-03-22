const fs = require('fs');
const chalk = require('chalk');

init().catch(function (e) {
  console.log(e);
});

// gatsby-config.js
async function gatsbyConfReset() {
  const content = `module.exports = require('./gatsby-config.bak');\n`;
  fs.writeFile('gatsby-config.js', content, function (err) {
    if (err) return;
    console.log(chalk.gray`[reset]`, chalk.yellow`gatsby-config.js`);
  });
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

async function init() {
  gatsbyConfReset();
  logoReset();
  cnameReset();
}
