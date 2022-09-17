const core = require('@actions/core');
const github = require('@actions/github');
// const { Octokit } = require('@octokit/rest');

try {
  const ms = core.getInput('input_testing');
  const API_KEY = core.getInput('DEEPL_TOKEN');
  const API_URL = 'https://api-free.deepl.com/v2/translate';

  let content = encodeURI(
    'auth_key=' + API_KEY + '&text=' + entext + '&source_lang=EN&target_lang=JA',
  );
  let url = API_URL + '?' + content;

  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Could not reach the API: ' + response.statusText);
      }
    })
    .then(function (data) {
      translated_result = data['translations'][0]['text'];
      core.setOutput('output_testing_success', translated_result);
    })
    .catch(function (error) {
      error_message = error.message;
      core.setOutput('output_testing_error', error_message);
    });

  console.log('Input: ', ms);
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
