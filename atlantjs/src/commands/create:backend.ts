import {
  jsonFilesInfo,
  createTempFiles,
  fileExists,
  parseJson,
  parseString,
  removeTempFiles,
  save,
} from '../extends/file-manager'
import { resolve } from 'path'
import {
  installPackages,
  // openProject,
  // startGit,
} from '../extends/before-generate-manager'

module.exports = {
  name: 'create:backend',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const {
      parameters,
      template,
      print: { success },
    } = toolbox

    const FOLDER_NAME_TEMPLATE = 'back-end/api'

    const name: string = parameters.first || '.'

    // const { repoUrl } = toolbox.parameters.options

    const backendFiles = jsonFilesInfo(FOLDER_NAME_TEMPLATE, name)

    backendFiles.map(async (file) => {
      await createTempFiles(template, file)
      const fileTempJson = parseJson(resolve('temp', file.target))

      const isFileUserExists = await fileExists(file)

      if (isFileUserExists) {
        // console.log('==MERGE FILES (packages.json)==')
      }

      const fileTempString = await parseString(fileTempJson)

      await save(resolve(file.target), fileTempString)
    })

    await removeTempFiles()

    await installPackages(name)

    // await startGit(name, repoUrl)

    // await openProject(name)

    success(`Generated ${name} app.`)

    //corrigir caminhos
    // deixar funcionar todos os comandos
    success(`Generated ${name} app.`)
  },
}
