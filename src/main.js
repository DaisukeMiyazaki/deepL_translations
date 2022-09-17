const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');

async function run() {
  try {
    const ms = core.getInput('testInput');
    console.log(ms)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
