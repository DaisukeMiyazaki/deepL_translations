const core = require('@actions/core');
const deepl = require('deepl-node');

try {
  const ms = core.getInput('deepL_input');
  const API_KEY = process.env.DEEPL_API_KEY;
  const translator = new deepl.Translator(API_KEY);

  // translating from japanese to english
  core.info('translating from japanese to english');
  (async () => {
    const result = await translator.translateText(ms, 'ja', 'en-US');
    core.setOutput('deepL_output_success', result.text);
  })();
  core.info('translation finished');

  // Get the JSON webhook payload for the event that triggered the workflow for debug
  // const payload = JSON.stringify(github.context.payload, undefined, 2);
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
