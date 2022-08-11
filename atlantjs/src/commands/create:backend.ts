/*
 * Escrever comits realizados após a criação de uma layer ou módulo, abstraindo cada implementação em pequenas tarefas (separar tests e feats)
 */

import {
  getListFilesInfo,
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

    const FOLDER_API_TEMPLATE = 'back-end/api'
    const FOLDER_CORE_TEMPLATE = 'core'

    const { options } = parameters

    const name: string = parameters.first || '.'

    const backendFilesList = getListFilesInfo(FOLDER_API_TEMPLATE, name)
    const coreFilesList = getListFilesInfo(FOLDER_CORE_TEMPLATE, name)

    await createFilesLayerCommand(template, backendFilesList, `backend ${name}`)

    setTimeout(async () => {
      await createFilesLayerCommand(template, coreFilesList, `core ${name}`)
    }, 3000)

    setTimeout(async () => {
      await clearTempFiles()

      if (await installPackagesCommand(name)) {
        await startGitCommand(name)
        await openProjectCommand(name)
      }

      let integrations = []

      Object.keys(options).map((command) => {
        integrations.push(command)
      })

      // const response = await Promise.all(
      //   integrations.map(async (command) => {
      //     let res: Array<Response> = []
      //     switch (command) {
      //       case FlagsBackend.REPO:
      //         res.push(await startRepositoryCommand(options.repo))
      //         break
      //       case FlagsBackend.TRELLO:
      //         res.push(await createBoardTrelloCommand('credential'))
      //         break
      //       case FlagsBackend.WIKI:
      //         res.push(await createNotionWikiCommand('credential'))
      //         break
      //       case FlagsBackend.BUILD:
      //         res.push(await buildAppCommand('credential', 'gitRepoUrl'))
      //         break
      //       default:
      //     }
      //     return res
      //   })
      // )

      // // printInfoCommands(
      // //   response.map((res) => res[0]),
      // //   Environments.BACKEND
      // // )
      // // printFooter()
    }, 1000)
  },
}
