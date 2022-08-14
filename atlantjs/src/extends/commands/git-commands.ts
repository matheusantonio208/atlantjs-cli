import { system } from 'gluegun'
import ora = require('ora')
import { Response } from '../types'
import { log } from '../utils/logs-messages'
import { prompt } from 'enquirer'
import { verifyConflicts } from '../services/file-service'

export async function startGitCommand(dirProject?): Promise<Response> {
  const spinner = ora(log.git.start).start()
  try {
    await system.run(
      `cd ${
        dirProject || '.'
      } && git init && git add . && git commit -m "feat: add back-end layer layer" && git branch -M main`
    )
    spinner.stop()

    ora(log.git.success).succeed()
  } catch (error) {
    spinner.fail(log.git.fail + error)
  }
  return { infoText: log.git.info }
}

export async function createCommitCommand(message): Promise<Response> {
  const spinner = ora(log.commit.start).start()
  try {
    await system.run(`git add . && git commit -m "${message}"`)
    spinner.stop()

    ora(log.commit.success).succeed()
  } catch (error) {
    spinner.fail(log.commit.fail)
  }
  return { infoText: log.commit.info }
}

export async function startRepositoryCommand(repoUrl): Promise<Response> {
  const spinner = ora(log.repository.start).start()
  try {
    await system.run(`
    git remote add origin ${repoUrl} &&
    git push -u origin main
  `)
    spinner.stop()
    ora(log.repository.success).succeed()
  } catch (error) {
    spinner.fail(log.repository.fail)
  }
  return { infoText: log.repository.info }
}

export async function verifyConflictCommands(callback, dirProject?) {
  try {
    let inConflict = await verifyConflicts(dirProject ?? '.')

    if (inConflict) {
      const response = await prompt({
        type: 'confirm',
        name: 'inConflict',
        message: 'Corrected conflicts?',
      }).then(callback)

      inConflict = !response
      return inConflict
    }
  } catch (error) {
    console.log(error)
  }
}
