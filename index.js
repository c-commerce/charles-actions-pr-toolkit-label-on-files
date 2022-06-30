const core = require('@actions/core')
const github = require('@actions/github')

// most @actions toolkit packages have async methods
async function run () {
  if (!github.context.payload.pull_request) {
    core.info('skipping as this context does not seem to be a PR')
    return core.setOutput('status', 'skipped')
  }

  await github.getOctokit().rest.issues.addLabels({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    issue_number: github.context.payload.pull_request.number,
    labels: ['hello-world']
  })
}

run()
