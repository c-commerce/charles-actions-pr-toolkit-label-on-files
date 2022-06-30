const core = require('@actions/core')
const github = require('@actions/github')
const doLabel = require('./lib/label')

// most @actions toolkit packages have async methods
async function run () {
  if (!github.context.payload.pull_request) {
    core.info('skipping as this context does not seem to be a PR')
    return core.setOutput('status', 'skipped')
  }

  const labels = core.getInput('labels').split(',')

  await doLabel(labels)

  core.setOutput('status', 'done')
}

run()
