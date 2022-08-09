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
  // infoAfterCreate,
  printFooter,
  cd,
  printInfoCommands,
} from '../extends/commands/terminal-commands'
import {
  startGitCommand,
  startRepositoryCommand,
} from '../extends/commands/git-commands'
import {
  buildAppWithHerokuCommand,
  createBoardTrelloCommand,
  createNotionWikiCommand,
} from '../extends/commands/implementations-commands'
import { Environments, Integrations } from '../extends/types'

module.exports = {
  name: 'create-app:backend',
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
    }, 1000)

    setTimeout(async () => {
      await clearTempFiles()

      await cd('.')

      if (await installPackagesCommand()) {
        await startGitCommand()
        await openProjectCommand()
      }

      let integrations = []
      let responseIntegrations = []

      Object.keys(options).map((command) => {
        integrations.push(command)
      })

      integrations.map((command) => {
        switch (command) {
          case Integrations.GIT_REPO:
            responseIntegrations.push(startRepositoryCommand(options.repo))
            break
          case Integrations.TRELLO:
            responseIntegrations.push(createBoardTrelloCommand('credential'))
            break
          case Integrations.NOTION:
            responseIntegrations.push(createNotionWikiCommand('credential'))
            break
          case Integrations.HEROKU:
            responseIntegrations.push(
              buildAppWithHerokuCommand('credential', 'gitRepoUrl')
            )
            break
          default:
        }
      })

      printInfoCommands(responseIntegrations, Environments.BACKEND)
      printFooter()
    }, 1000)
  },
}
