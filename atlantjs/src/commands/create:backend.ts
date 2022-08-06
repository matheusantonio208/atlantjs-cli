import { coreFiles } from '../utils/files/core-files'
import {
  createTempFiles,
  fileExists,
  parseJson,
  parseString,
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

    coreFiles(name).map(async (file) => {
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
