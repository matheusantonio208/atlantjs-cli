import { getListFilesInfo, clearTempFiles } from '../extends/file-manager'
import {
  installPackagesCommand,
  startGitCommand,
  openProjectCommand,
  startRepositoryCommand,
  createFilesLayerCommand,
  infoAfterCreate,
  footerTerminalLog,
} from '../extends/commands'

module.exports = {
  name: 'create-app:backend',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const { parameters, template } = toolbox

    const FOLDER_API_TEMPLATE = 'back-end/api'
    const FOLDER_CORE_TEMPLATE = 'core'

    const {
      repo: gitRepoUrl,
      trello: trelloUrl,
      notion: notionUrl,
      heroku: herokuUrl,
      properties: dtoProperties,
      module: moduleName,
      name: appName,
      googleAnalytics,
      adMob,
    } = toolbox.parameters.options

    const name: string = parameters.first || '.' || appName

    const backendFilesList: Array<unknown> = getListFilesInfo(
      FOLDER_API_TEMPLATE,
      name
    )
    const coreFilesList: Array<unknown> = getListFilesInfo(
      FOLDER_CORE_TEMPLATE,
      name
    )

    await createFilesLayerCommand(template, backendFilesList, `backend ${name}`)

    setTimeout(async () => {
      await createFilesLayerCommand(template, coreFilesList, `core ${name}`)
    }, 1000)

    setTimeout(async () => {
      await clearTempFiles()

      if (await installPackagesCommand(name)) {
        await startGitCommand(name)
        await openProjectCommand(name)
      }

      if (gitRepoUrl) {
        await startRepositoryCommand(name, gitRepoUrl)
      }

      // if (trelloUrl) {
      //   await createBoardTrelloCommand(name, trelloUrl)
      // }

      // if (notionUrl) {
      //   await createNotionWikiCommand(name, trelloUrl)
      // }

      // if (herokuUrl && gitRepoUrl) {
      //   await buildAppWithHerokuCommand(name, trelloUrl, gitRepoUrl)
      // } else if (herokuUrl === undefined) {
      //   await showErrorLog(
      //     'To make the application build, it is necessary to inform the repository URL where the code is hosted'
      //   )
      // } else if (herokuUrl && gitRepoUrl === undefined) {
      //   await showErrorLog(
      //     'To make the application build, it is necessary to inform the heroku URL where the code is hosted'
      //   )
      // }

      // if (moduleName && dtoProperties) {
      //   await createModuleWithDto(name, trelloUrl)
      // } else if (dtoProperties && moduleName === undefined) {
      //   await showErrorLog(
      //     'It is necessary to inform the name of the module to create it'
      //   )
      // }

      // if (moduleName) {
      //   await createModuleCommand(name, trelloUrl)
      // }
      infoAfterCreate({
        trelloUrl,
        notionUrl,
        herokuUrl,
        gitRepoUrl,
        figmaUrl: false,
        adMob,
        googleAnalytics,
        expo: false,
        dtoProperties,
        moduleName,
        backend: true,
        frontend: false,
        mobile: false,
      })
    }, 1000)

    footerTerminalLog()
  },
}
