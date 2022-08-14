import {
  createModuleCommand,
  installPackagesCommand,
} from '../extends/commands/layers-commands'

import { createCommitCommand } from '../extends/commands/git-commands'

import { printFooter } from '../extends/commands/terminal-commands'

import {
  clearTempFiles,
  getListModuleInfo,
} from '../extends/services/file-service'
import { lowerFirstLetter, upperFirstLetter } from '../extends/utils'

module.exports = {
  name: 'create:module',
  description: 'Create the initial files of the application',
  run: async (toolbox) => {
    const { parameters, template } = toolbox
    const { module: moduleName } = toolbox.parameters.options

    const name: string = parameters.first || moduleName

    const moduleNameUpper = upperFirstLetter(name)
    const moduleNameLower = lowerFirstLetter(name)

    const moduleFilesList = getListModuleInfo(name, {
      moduleNameUpper,
      moduleNameLower,
    })

    await createModuleCommand(
      template,
      moduleFilesList,
      `module ${name}`,
    )

    setTimeout(async () => {
      await clearTempFiles()

      // if (await installPackagesCommand()) {
      //   await createCommitCommand(`feat: creates module ${name}`)
      // }
      // printFooter()
    }, 1000)
  },
}
