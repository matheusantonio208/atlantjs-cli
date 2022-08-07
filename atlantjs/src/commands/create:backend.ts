import { getListFilesInfo, removeTempFiles } from '../extends/file-manager'
import {
  installPackagesCommand,
  startGitCommand,
  openProjectCommand,
  startRepositoryCommand,
  createFilesLayerCommand,
} from '../extends/commands'

module.exports = {
  name: 'create:backend',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const { parameters, template } = toolbox

    const FOLDER_API_TEMPLATE = 'back-end/api'
    const FOLDER_CORE_TEMPLATE = 'core'

    const name: string = parameters.first || '.'

    const { repoUrl } = toolbox.parameters.options

    const backendFilesList: Array<unknown> = getListFilesInfo(
      FOLDER_API_TEMPLATE,
      name
    )
    const coreFilesList: Array<unknown> = getListFilesInfo(
      FOLDER_CORE_TEMPLATE,
      name
    )

    await createFilesLayerCommand(template, backendFilesList, 'backend')
    await createFilesLayerCommand(template, coreFilesList, 'core')

    setTimeout(async () => {
      await removeTempFiles()

      if (await installPackagesCommand(name)) {
        await startGitCommand(name)
        await openProjectCommand(name)
      }

      if (repoUrl) {
        await startRepositoryCommand(name, repoUrl)
      }
    }, 1000)
  },
}
