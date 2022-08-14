/*
 * Escrever comits realizados após a criação de uma layer ou módulo, abstraindo cada implementação em pequenas tarefas (separar tests e feats)
 */

import {
  getInfoToGenerateFiles,
  clearTempFiles,
  verifyConflicts,
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
import {
  buildAppCommand,
  createBoardTrelloCommand,
  createNotionWikiCommand,
} from '../extends/commands/flags-commands'
import { Environments, FlagsBackend, Response } from '../extends/types'

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
    let inConflict: boolean

    setTimeout(async () => {
      const coreFilesList = getInfoToGenerateFiles(FOLDER_CORE_TEMPLATE, name)
      await createFilesLayerCommand(
        template,
        coreFilesList,
        `core ${name}`,
        FOLDER_CORE_TEMPLATE,
        FOLDER_API_TEMPLATE
      )
    })

    setTimeout(async () => {
      await startGitCommand(name)
    }, delay)

    setTimeout(async () => {
      const backendFilesList = getInfoToGenerateFiles(FOLDER_API_TEMPLATE, name)
      await createFilesLayerCommand(
        template,
        backendFilesList,
        `backend ${name}`,
        FOLDER_CORE_TEMPLATE,
        FOLDER_API_TEMPLATE
      )
    }, delay * 2)

    setTimeout(async () => {
      await clearTempFiles()
      await openProjectCommand(name)
      inConflict = await verifyConflictCommands(afterResolveConflict, name)
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
            case FlagsBackend.TRELLO:
              res.push(await createBoardTrelloCommand('credential'))
              break
            case FlagsBackend.WIKI:
              res.push(await createNotionWikiCommand('credential'))
              break
            case FlagsBackend.BUILD:
              res.push(await buildAppCommand('credential', 'gitRepoUrl'))
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
