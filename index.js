const core = require('@actions/core')
const github = require('@actions/github')
const doLabel = require('./lib/label')

// most @actions toolkit packages have async methods
async function run () {
  if (!github.context.payload.pull_request) {
    core.info('skipping as this context does not seem to be a PR')
    return core.setOutput('status', 'skipped')
  }

  const token = core.getInput('token') ?? process.env.GITHUB_TOKEN

  if (!token) {
    return core.error('a github token is required but was not provided')
  }

  const labels = core.getInput('labels').split(',')

  await doLabel(token, labels)

  core.setOutput('status', 'done')
}

run()
