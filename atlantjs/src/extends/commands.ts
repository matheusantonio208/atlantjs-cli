import * as ora from 'ora'
import { system } from 'gluegun'
import { createFiles } from '../extends/file-manager'

export async function createFilesLayerCommand(
  template,
  files,
  moduleNameToLog: string
) {
  let spinner = ora(`Creating ${moduleNameToLog} Files`).start()
  try {
    await createFiles(template, files)

    spinner.stop()
    ora(`Files ${moduleNameToLog} Created`).succeed()
  } catch (error) {
    spinner.fail(
      ` Fail to create files of ${moduleNameToLog} ${error.toString()}`
    )
  }
}

export async function installPackagesCommand(name) {
  const spinner = ora('Install packages').start()
  try {
    await system.run(`cd ${name} && yarn`)
    spinner.stop()
    ora('Installed packages').succeed()

    return true
  } catch (error) {
    spinner.fail(` Fail to install packages ${error.toString()}`)
    return false
  }
}

export async function startGitCommand(name) {
  const spinner = ora('Initialized Git').start()
  try {
    await system.run(
      `cd ${name} && git init && git add . && git commit -m "feat: add back-end layer layer" && git branch -M main`
    )
    spinner.stop()
    ora('Git initialized').succeed()
  } catch (error) {
    spinner.fail('Fail to Initialized Git')
  }
}

export async function startRepositoryCommand(name, repoUrl) {
  const spinner = ora('Initializing Repository').start()
  try {
    await system.run(`
    cd ${name} &&
    git remote add origin ${repoUrl} &&
    git push -u origin main
  `)
    spinner.stop()
    ora('Repository initialized').succeed()
  } catch (error) {
    spinner.fail('Fail to initializing Repository')
  }
}

export async function openProjectCommand(name) {
  await system.run(`
    cd ${name} &&
    code .
  `)
}
