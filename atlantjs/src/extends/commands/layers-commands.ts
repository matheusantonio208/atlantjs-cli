import * as ora from 'ora'
import { system } from 'gluegun'
import * as chalk from 'chalk'
import { createEntity, createFiles } from '../services/file-service'
import { log } from '../utils/logs-messages'

export async function createFilesLayerCommand(
  template,
  infoFilesList: Array<unknown>,
  moduleNameToLog: string,
  moduleA,
  moduleB
) {
  let spinner = ora(
    log.layers.start.replace(
      '$layerName',
      chalk.bold.italic.gray(moduleNameToLog)
    )
  ).start()

  try {
    await createFiles(template, infoFilesList, moduleA, moduleB)

    spinner.stop()
    ora(
      log.layers.success.replace(
        '$layerName',
        chalk.bold.italic.gray(moduleNameToLog)
      )
    ).succeed()
  } catch (error) {
    spinner.fail(
      log.layers.fail.replace(
        '$layerName',
        chalk.bold.italic.gray(moduleNameToLog)
      )
    )
  }
}

export async function createModuleCommand(
  templateToolbox,
  infoFilesList,
  name,
  entityPath
) {
  let spinner = ora(
    log.module.start.replace('$moduleName', chalk.bold.italic.gray(name))
  ).start()

  try {
    await createFiles(templateToolbox, infoFilesList, 'USER', name)
    await createEntity(entityPath)

    spinner.stop()
    ora(
      log.module.success.replace('$moduleName', chalk.bold.italic.gray(name))
    ).succeed()
  } catch (error) {
    spinner.fail(
      log.module.fail.replace('$moduleName', chalk.bold.italic.gray(name))
    )
  }
}

export async function installPackagesCommand(dirProject?) {
  const spinner = ora(log.dependencies.start).start()

  try {
    await system.run(`cd ${dirProject || '.'} yarn`)

    spinner.stop()
    ora(log.dependencies.success).succeed()

    return true
  } catch (error) {
    spinner.fail(log.dependencies.fail)

    return false
  }
}

export async function openProjectCommand(dirProject?) {
  const spinner = ora(log.project.start).start()

  try {
    await system.run(`code ${dirProject || '.'}`)

    spinner.stop()
    ora(log.project.success).succeed()
  } catch (error) {
    spinner.fail(log.project.fail)
  }
}
