const github = require('@actions/github')

/**
 *
 * @param {String[]} labels
 */
module.exports = async function label (token, labels) {
  await github.getOctokit(token).rest.issues.addLabels({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    issue_number: github.context.payload.pull_request.number,
    labels
  })
}
