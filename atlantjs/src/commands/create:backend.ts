import {
  jsonFilesInfo,
  createFiles,
  removeTempFiles,
} from '../extends/file-manager'
import {
  installPackages,
  startGit,
  openProject,
  startRepository,
} from '../extends/before-generate-manager'

module.exports = {
  name: 'create:backend',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const { parameters, template } = toolbox

    const FOLDER_API_TEMPLATE = 'back-end/api'
    const FOLDER_CORE_TEMPLATE = 'core'

    const name: string = parameters.first || '.'

    const { repoUrl } = toolbox.parameters.options

    const backendFiles = jsonFilesInfo(FOLDER_API_TEMPLATE, name)
    const coreFiles = jsonFilesInfo(FOLDER_CORE_TEMPLATE, name)

    await createFiles(template, backendFiles)
    await createFiles(template, coreFiles)

    setTimeout(async () => {
      const packageInstalled = await installPackages(name)
      await removeTempFiles()
      if (packageInstalled) {
        await startGit(name)
        await openProject(name)
      }

      if (repoUrl) {
        await startRepository(name, repoUrl)
      }
    }, 1000)

    //corrigir caminhos
  },
}
