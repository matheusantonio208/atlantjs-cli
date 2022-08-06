import * as ora from 'ora'
import { system } from 'gluegun'

export async function installPackages(name) {
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

export async function startGit(name) {
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

export async function startRepository(name, repoUrl) {
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

export async function openProject(name) {
  await system.run(`
    cd ${name} &&
    code .
  `)
}
