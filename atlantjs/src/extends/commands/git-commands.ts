import { system } from 'gluegun'
import ora = require('ora')

export async function startGitCommand() {
  const spinner = ora('Initializing Git...').start()
  try {
    await system.run(
      `git init && git add . && git commit -m "feat: add back-end layer layer" && git branch -M main`
    )
    spinner.stop()
    ora('Git success initialized!').succeed()
  } catch (error) {
    spinner.fail('Failure to start the git')
  }
}

export async function createCommitCommand(message) {
  const spinner = ora('Creating Commit...').start()
  try {
    await system.run(`git add . && git commit -m "${message}" && git push`)
    spinner.stop()
    ora('Commit created successfully!').succeed()
  } catch (error) {
    spinner.fail('Failure when performing Commit')
  }
}

export async function startRepositoryCommand(repoUrl) {
  const spinner = ora('Initializing Repository...').start()
  try {
    await system.run(`
    git remote add origin ${repoUrl} &&
    git push -u origin main
  `)
    spinner.stop()
    ora('Repository Successful initialized!').succeed()
  } catch (error) {
    spinner.fail('Failure to start the Repository')
  }
}
