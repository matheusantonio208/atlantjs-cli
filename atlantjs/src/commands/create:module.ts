// import {
//   createFilesLayerCommand,
//   createCommitCommand,
//   installPackagesCommand,
// } from '../extends/commands/files-commands'

// import { footerTerminalLog } from '../extends/commands/terminal-commands'

// import { clearTempFiles, getListModuleInfo } from '../extends/services/file-service'
// import { lowerFirstLetter, upperFirstLetter } from '../extends/utils'

module.exports = {
  name: 'create:module',
  description: 'Create the initial files of the application',
  run: async () => {
    //     const { parameters, template } = toolbox
    //     const { module: moduleName } = toolbox.parameters.options
    //     const name: string = parameters.first || moduleName
    //     const moduleNameUpper = upperFirstLetter(name)
    //     const moduleNameLower = lowerFirstLetter(name)
    //     const moduleFilesList: Array<unknown> = getListModuleInfo(name, {
    //       moduleNameUpper,
    //       moduleNameLower,
    //     })
    //     await createFilesLayerCommand(template, moduleFilesList, `module ${name}`)
    //     setTimeout(async () => {
    //       await clearTempFiles()
    //       if (await installPackagesCommand('.')) {
    //         await createCommitCommand(`feat: creates module ${name}`)
    //       }
    //     }, 1000)
    //     footerTerminalLog()
  },
}
