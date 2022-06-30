const github = require('@actions/github')
const minimatch = require('minimatch')

/**
 *
 * @param {String[]} labels
 */
module.exports = async function label (token, labels, globs) {
  if (!Object.values(globs).some((item) => (item))) return false

  const files = await github.getOctokit(token).rest.pulls.listFiles({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    issue_number: github.context.payload.pull_request.number,
    labels
  })

  const _hasAtLeastFile = hasAtLeastFile(files.data, globs)

  if (!_hasAtLeastFile) return false

  await github.getOctokit(token).rest.issues.addLabels({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    issue_number: github.context.payload.pull_request.number,
    labels
  })

  return true
}

function hasAtLeastFile (files, globs) {
  const actionableGlob = globs.deleted || globs.modified
  if (!actionableGlob) return false

  const hasAtLeastFile = files.filter((file) => {
    if (globs.deleted && file.status === 'removed') return true
    if (globs.modified && ['added', 'renamed', 'changed', 'modified', 'added', 'copied'].includes(file.status)) return true
    return false
  }).some((file) => {
    return minimatch(file.filename, actionableGlob)
  })

  return hasAtLeastFile
}

module.exports.hasAtLeastFile = hasAtLeastFile
