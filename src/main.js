const core = require('@actions/core');
const github = require('@actions/github');
// const { Octokit } = require('@octokit/rest');
const deepl = require('deepl-node');

try {
  const ms = core.getInput('input_testing');
  const API_KEY = process.env.DEEPL_API_KEY;
  const translator = new deepl.Translator(API_KEY);

  (async () => {
    const result = await translator.translateText(ms, 'ja', 'en-US');
    console.log(result.text);
  })();

  console.log('Input: ', ms);
  core.setOutput('output_testing_success', result.text);
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
