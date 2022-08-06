import {
  createTempFiles,
  fileExists,
  parseJson,
  parseString,
  createFiles,
  save,
  removeTempFiles,
} from '../extends/file-manager'
import { resolve } from 'path'

module.exports = {
  name: 'create:backend',
  description: 'Create the initial files of the application',
  run: async (toolbox) => {
    const {
      parameters,
      template,
      print: { success, error },
    } = toolbox

    const name: string = parameters.first ?? error('App name must be specified')
    const backendFiles = createFiles('back-end/api', name)

    backendFiles.map(async (file) => {
      await createTempFiles(template, file)
      const fileTempJson = parseJson(resolve('temp', file.target))

      const isFileUserExists = await fileExists(file)

      if (isFileUserExists) {
        console.log('==MERGE FILES==')
      }

      const fileTempString = await parseString(fileTempJson)

      save(resolve(file.target), fileTempString)
      await removeTempFiles()

      //corrigir caminhos
      //deixar cli boita
      // deixar funcionar todos os comandos
    })

    success(`Generated ${name} app.`)
  },
}
