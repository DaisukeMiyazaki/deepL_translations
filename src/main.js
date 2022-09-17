const core = require('@actions/core');
const github = require('@actions/github');
// const { Octokit } = require('@octokit/rest');

try {
  const ms = core.getInput('input_testing');
  core.debug('Inside try block');
  const time = new Date().toTimeString();
  core.setOutput('time', time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

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
