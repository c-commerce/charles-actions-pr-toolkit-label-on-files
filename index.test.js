const process = require('process')
const cp = require('child_process')
const path = require('path')

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env.INPUT_LABELS = '1,2'
  const ip = path.join(__dirname, 'index.js')
  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString()

  expect(result).toBe('skipping as this context does not seem to be a PR\n\n::set-output name=status::skipped\n')
})
