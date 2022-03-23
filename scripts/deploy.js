const { spawnSync } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');

const { token } = argv;

if (!token) {
  console.log(chalk.red('required: `token`'));
  process.exit();
}

init().catch(function (e) {
  console.log(e);
});

async function init() {
  // install deps
  spawnSync('yarn', { stdio: 'inherit' });

  // download issues
  spawnSync('yarn', ['posts', `--token=${token}`], { stdio: 'inherit' });

  // initialize gatsby configuration
  spawnSync('yarn', ['reconf'], { stdio: 'inherit' });

  // build
  spawnSync('yarn', ['build'], { stdio: 'inherit' });

  // copy CNAME & feed.xml
  spawnSync('yarn', ['copy'], { stdio: 'inherit' });

  console.log(
    chalk.yellow`\nPlease publish the ${chalk.green`public`} directory to the platform you want to deploy to\n`
  );
}
