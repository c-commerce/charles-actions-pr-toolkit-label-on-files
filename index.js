const core = require('@actions/core')
const github = require('@actions/github')
const doLabel = require('./lib/label')

// most @actions toolkit packages have async methods
async function run () {
  if (!github.context.payload.pull_request) {
    core.info('skipping as this context does not seem to be a PR')
    return core.setOutput('status', 'skipped')
  }

  const token = core.getInput('token') || process.env.GITHUB_TOKEN

  if (!token) {
    return core.setFailed('a github token is required but was not provided')
  }

  const globs = {
    deleted: core.getInput('files_deleted'),
    modified: core.getInput('files_modified')
  }

  const labels = core.getInput('labels').split(',')

  const result = await doLabel(token, labels, globs)

  if (!result) {
    return core.setOutput('status', 'skipped')
  }

  core.setOutput('status', 'done')
}

run()
