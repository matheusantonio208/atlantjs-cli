import {
  createFiles,
  createTempFiles,
  fileExists,
  parseJson,
  parseString,
  removeTempFiles,
  save,
} from '../extends/file-manager'
import { info } from 'console'
import { resolve } from 'path'
import { system } from 'gluegun'

module.exports = {
  name: 'create:db:mongo',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const {
      parameters,
      template,
      print: { success },
    } = toolbox

    const FOLDER_NAME_TEMPLATE = 'back-end/database/database-mongoDB'

    const name: string = parameters.first || '.'

    const backendFiles = createFiles(FOLDER_NAME_TEMPLATE, name)

    backendFiles.map(async (file) => {
      await createTempFiles(template, file)
      const fileTempJson = parseJson(resolve('temp', file.target))

      const isFileUserExists = await fileExists(file)

      if (isFileUserExists) {
        console.log('==MERGE FILES (packages.json)==')
      }

      const fileTempString = await parseString(fileTempJson)

      save(resolve(file.target), fileTempString)
      await removeTempFiles()

      info(`Run yarn install`)
      await system.run(`cd ${name} && yarn`)

      info(`Start git`)
      await system.run(`
      cd ${name} &&
      git add . &&
      git commit -m "feat: add mongo db layer layer" &&
      git push
      `)

      success(`Add mongo db in your application.`)
    })
  },
}
