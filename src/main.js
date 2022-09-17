const core = require('@actions/core');
// const github = require('@actions/github');
// const { Octokit } = require('@octokit/rest');

async function run() {
  const ms = core.getInput('testInput');
  try {
    core.debug('Inside try block');

    if (!ms) {
      core.warning('testInput was not set');
    }

    if (core.isDebug()) {
      // curl -v https://github.com
      core.warning('isDebug is true');
    } else {
      // curl https://github.com
      core.warning('isDebug is false');
    }

    // Do stuff
    core.info('Output to the actions build log');

    core.notice('This is a message that will also emit an annotation');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
