import {
  createTempFiles,
  fileExists,
  parseJson,
  parseString,
  createFiles,
  save,
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
    const coreFile = createFiles('core', name)

    coreFile.map(async (file) => {
      await createTempFiles(template, file)
      const fileTempJson = parseJson(resolve('temp', file.target))

      const isFileUserExists = await fileExists(file)

      if (isFileUserExists) {
        console.log('File Exists')
      }

      const fileTempString = await parseString(fileTempJson)

      save(resolve('user', file.target), fileTempString)
    })

    success(`Generated ${name} app.`)
  },
}
