const github = require('@actions/github')

/**
 *
 * @param {String[]} labels
 */
module.exports = async function label (labels) {
  await github.getOctokit().rest.issues.addLabels({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    issue_number: github.context.payload.pull_request.number,
    labels
  })
}
