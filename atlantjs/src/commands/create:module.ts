import {
  createFilesLayerCommand,
  createCommitCommand,
  installPackagesCommand,
  footerTerminalLog,
} from '../extends/commands'
import {
  getListFilesInfo,
  clearTempFiles,
  getListModuleInfo,
} from '../extends/file-manager'
import { lowerFirstLetter, upperFirstLetter } from '../utils'

module.exports = {
  name: 'create:module',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const { parameters, template } = toolbox
    const FOLDER_MODULE_TEMPLATE = 'back-end/modules'

    const { module: moduleName } = toolbox.parameters.options

    const name: string = parameters.first || moduleName

    const moduleNameUpper = upperFirstLetter(name)
    const moduleNameLower = lowerFirstLetter(name)

    const moduleFilesList: Array<unknown> = getListModuleInfo(name, {
      moduleNameUpper,
      moduleNameLower,
    })

    await createFilesLayerCommand(template, moduleFilesList, `module ${name}`)

    setTimeout(async () => {
      await clearTempFiles()
      if (await installPackagesCommand(name)) {
        await createCommitCommand(`feat: creates module ${name}`)
      }
    }, 1000)

    footerTerminalLog()
  },
}
