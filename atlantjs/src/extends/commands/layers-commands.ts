import * as ora from 'ora'
import { system } from 'gluegun'
import * as chalk from 'chalk'
import { createFiles } from '../services/file-service'

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

export async function createModuleCommand(
  templateToolbox,
  infoFilesList,
  name,
  entity
) {
  let spinner = ora(`Creating ${chalk.bold.italic.gray(name)} files...`).start()

  try {
    await createFiles(templateToolbox, infoFilesList)

    spinner.stop()
    ora(`Files ${chalk.bold.italic.gray(name)} created successfully!`).succeed()
  } catch (error) {
    spinner.fail(
      ` Fail to create files of ${chalk.bold.italic.gray(
        name
      )} ${error.toString()}`
    )
  }
}

export async function installPackagesCommand() {
  const spinner = ora('Installing dependencies...').start()
  try {
    await system.run(`yarn`)
    spinner.stop()
    ora('Dependencies installed successfully!').succeed()

    return true
  } catch (error) {
    spinner.fail(`Failure to install the dependencies ${error.toString()}`)
    return false
  }
}

export async function openProjectCommand() {
  const spinner = ora('Opening the project...').start()

  try {
    await system.run(`code .`)
    spinner.stop()
    ora(
      `Success when opening the project ${chalk.bold.italic.gray(name)}!`
    ).succeed()
  } catch (error) {
    spinner.fail('Failure to start the Repository')
  }
}
