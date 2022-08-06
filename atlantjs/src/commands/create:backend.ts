import {
  jsonFilesInfo,
  createFiles,
  removeTempFiles,
} from '../extends/file-manager'
import {
  installPackages,
  // startGit,
  // openProject,
} from '../extends/before-generate-manager'

module.exports = {
  name: 'create:backend',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const { parameters, template } = toolbox

    const FOLDER_NAME_TEMPLATE = 'back-end/api'

    const name: string = parameters.first || '.'

    // const { repoUrl } = toolbox.parameters.options

    const backendFiles = jsonFilesInfo(FOLDER_NAME_TEMPLATE, name)

    await createFiles(template, backendFiles)

    await installPackages(name)

    await removeTempFiles()

    // await startGit(name, repoUrl)

    // await openProject(name)

    //corrigir caminhos
    // deixar funcionar todos os comandos
  },
}
