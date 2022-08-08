import * as ora from 'ora'
import { system } from 'gluegun'
import { terminal } from 'terminal-kit'
import * as chalk from 'chalk'
import { createFiles } from '../extends/file-manager'
import { get as getEmoji } from 'node-emoji'

export async function createFilesLayerCommand(
  template,
  infoFilesList: Array<unknown>,
  moduleNameToLog: string
) {
  let spinner = ora(
    `Creating ${chalk.bold.italic.gray(moduleNameToLog)} files...`
  ).start()
  try {
    await createFiles(template, infoFilesList)

    spinner.stop()
    ora(
      `Files ${chalk.bold.italic.gray(moduleNameToLog)} created successfully!`
    ).succeed()
  } catch (error) {
    spinner.fail(
      ` Fail to create files of ${chalk.bold.italic.gray(
        moduleNameToLog
      )} ${error.toString()}`
    )
  }
}

export async function installPackagesCommand(name) {
  const spinner = ora('Installing dependencies...').start()
  try {
    await system.run(`cd ${name} && yarn`)
    spinner.stop()
    ora('Dependencies installed successfully!').succeed()

    return true
  } catch (error) {
    spinner.fail(`Failure to install the dependencies ${error.toString()}`)
    return false
  }
}

export async function startGitCommand(name) {
  const spinner = ora('Initializing Git...').start()
  try {
    await system.run(
      `cd ${name} && git init && git add . && git commit -m "feat: add back-end layer layer" && git branch -M main`
    )
    spinner.stop()
    ora('Git success initialized!').succeed()
  } catch (error) {
    spinner.fail('Failure to start the git')
  }
}

export async function startRepositoryCommand(name, repoUrl) {
  const spinner = ora('Initializing Repository...').start()
  try {
    await system.run(`
    cd ${name} &&
    git remote add origin ${repoUrl} &&
    git push -u origin main
  `)
    spinner.stop()
    ora('Repository Successful initialized!').succeed()
  } catch (error) {
    spinner.fail('Failure to start the Repository')
  }
}

export async function openProjectCommand(name) {
  const spinner = ora('Opening the project...').start()

  try {
    await system.run(`
      cd ${name} &&
      code .
    `)
    spinner.stop()
    ora(
      `Success when opening the project ${chalk.bold.italic.gray(name)}!`
    ).succeed()

    terminal.bold(`\n===================================`)
    terminal.bold(`\n||                               ||`)
    terminal.bold(
      `\n||   ^y${getEmoji('rocket')} Let's go to coder! ${getEmoji(
        'rocket'
      )}^    ||`
    )
    terminal.bold(`\n||                               ||`)
    terminal.bold(`\n===================================\n\n`)

    terminal(`To Open Documentation Swagger:`)
    terminal(`\n❯    ^gyarn docs^ access in ^bhttp://localhost:8080/docs^\n\n`)

    terminal(`To Open Documentation Storybook:`)
    terminal(`\n❯    ^gyarn docs^ access in ^bhttp://localhost:8080/docs^\n\n`)

    terminal(`Start development with:`)
    terminal(`\n❯    ^gyarn dev^ access in ^bhttp://localhost:8080/^\n\n`)

    terminal(`Start debug with:`)
    terminal(`\n❯    ^gyarn dev:debug^\n\n`)

    terminal(`Trello board access in:`)
    terminal(`\n❯    ^bhttp://trello.com/^\n\n`)

    terminal(`Access your Figma in:`)
    terminal(`\n❯    ^bhttp://figma.com/^\n\n`)

    terminal(`Access Git Manual in:`)
    terminal(`\n❯    ^bhttp://notion.so/^\n\n`)

    terminal(`Access Wiki ${chalk.bold.italic.gray(name)} in:`)
    terminal(`\n❯    ^bhttp://notion.so/^\n\n`)

    terminal(`Access Repository in:`)
    terminal(`\n❯    ^bhttp://github.com/^\n\n`)

    terminal(`Access Expo in:`)
    terminal(`\n❯    ^bhttp://expo.com/^\n\n`)

    terminal.bold
      .italic('\n\nRun atlantjs')
      .bold.italic.green(' --help ')
      .bold.italic('to access doc cli of')
      .bold.italic.red(' AtlantJS.dev ')
      .bold.italic('and know more commands to make your life easier\n\n')

    terminal.bold
      .italic(`        Developed with`)
      .bold(` ${getEmoji('heart')} `)
      .bold.italic(` for Matheus Antonio\n\n`)
  } catch (err) {}
}
