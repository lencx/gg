// cp {CNAME,discussions/feed.xml} ./public
const fs = require('fs');
const chalk = require('chalk');

init().catch(function (e) {
  console.log(e);
});

async function init() {
  // CNAME
  fileCopy('CNAME', 'public/CNAME', 'CNAME');
  // RSS
  fileCopy('discussions/feed.xml', 'public/feed.xml', 'feed.xml');
}

function fileCopy(a, b, name) {
  if (fs.existsSync(a)) {
    if (fs.existsSync(b)) {
      fs.unlinkSync(b);
    }
    fs.copyFileSync(a, b);
    console.log(chalk.gray`[copy]`, chalk.yellow(name));
  }
}
