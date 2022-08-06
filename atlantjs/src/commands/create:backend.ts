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
  name: 'create:backend',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const {
      parameters,
      template,
      print: { success, error },
    } = toolbox

    const FOLDER_NAME_TEMPLATE = 'back-end/api'

    const name: string = parameters.first || '.'

    const { urlRepo } = toolbox.parameters.options

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
      git init &&
      git add . &&
      git commit -m "feat: add back-end layer layer" &&
      git branch -M main
    `)

      if (urlRepo) {
        await system.run(`
        cd ${name} &&
        git remote add origin ${urlRepo} &&
        git push -u origin main
      `)
      }

      await system.run(`
      cd ${name} &&
      code .
    `)
      success(`Generated ${name} app.`)

      //corrigir caminhos
      //deixar cli boita
      // deixar funcionar todos os comandos
    })

    success(`Generated ${name} app.`)
  },
}
