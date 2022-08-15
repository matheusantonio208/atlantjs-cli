import {
  getInfoToGenerateFiles,
  clearTempFiles,
} from '../extends/services/file-service'
import {
  installPackagesCommand,
  openProjectCommand,
  createFilesLayerCommand,
} from '../extends/commands/layers-commands'
import {
  printFooter,
  printInfoCommands,
} from '../extends/commands/terminal-commands'
import {
  startGitCommand,
  startRepositoryCommand,
  verifyConflictCommands,
} from '../extends/commands/git-commands'
import { Environments, FlagsBackend, Response } from '../extends/types'
import { upperCaseWord } from '../extends/utils'

module.exports = {
  name: 'create:backend',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const { parameters, template } = toolbox
    const { options } = parameters

    const name: string = parameters.first || '.'

    const FOLDER_API_TEMPLATE = 'back-end/api'
    const FOLDER_CORE_TEMPLATE = 'core'
    const delay = 500

    const coreFilesList = getInfoToGenerateFiles(FOLDER_CORE_TEMPLATE, name, {name})
    await createFilesLayerCommand(
      template,
      coreFilesList,
      `core ${name}`,
      FOLDER_CORE_TEMPLATE,
      FOLDER_API_TEMPLATE
    )

    setTimeout(async () => {
      await startGitCommand(name)
    }, delay)

    setTimeout(async () => {
      const backendFilesList = getInfoToGenerateFiles(FOLDER_API_TEMPLATE, name)
      await createFilesLayerCommand(
        template,
        backendFilesList,
        `backend ${name}`,
        upperCaseWord(FOLDER_CORE_TEMPLATE),
        upperCaseWord(FOLDER_API_TEMPLATE)
      )
    }, delay * 2)

    setTimeout(async () => {
      await clearTempFiles()
      await openProjectCommand(name)
      await verifyConflictCommands(afterResolveConflict, name)
    }, delay * 3)

    async function afterResolveConflict() {
      await installPackagesCommand(name)

      let integrations = []

      Object.keys(options).map((command) => {
        integrations.push(command)
      })
      let res: Array<Response> = []

      const response = await Promise.all(
        integrations.map(async (command) => {
          switch (command) {
            case FlagsBackend.REPO:
              res.push(await startRepositoryCommand(options.repo))
              break
            default:
          }
          return res
        })
      )

      printInfoCommands(
        response.map((res) => res[0]),
        Environments.BACKEND
      )
      printFooter()

    }
  },
}
