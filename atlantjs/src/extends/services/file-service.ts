import { resolve, join, dirname, basename } from 'path'
import * as jetpack from 'fs-jetpack'
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs'
import * as rimraf from 'rimraf'
import { FileName } from './files-structure'
import { lowerFirstLetter, upperFirstLetter } from '../utils'
import { mergeFiles } from './merge-service'

function getPathsTemplate(templateName: string, arrayOfFiles?) {
  const PATH_TEMPLATE = resolve(
    __dirname,
    '..',
    '..',
    'templates',
    templateName
  )

  let files = readdirSync(PATH_TEMPLATE)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    const PATH_FILE = `${PATH_TEMPLATE}/${file}`

    if (statSync(PATH_FILE).isDirectory()) {
      arrayOfFiles = getPathsTemplate(PATH_FILE, arrayOfFiles)
    } else {
      arrayOfFiles.push(join(__dirname, PATH_TEMPLATE, '/', file))
    }
  })

  let templates = []

  arrayOfFiles.map((directory) => {
    templates.push(
      directory.toString().substring(directory.indexOf(templateName))
    )
  })

  return templates
}

export function getListFilesInfo(
  module: string,
  appName?: string,
  props?
): Array<unknown> {
  const files = getPathsTemplate(module)

  let listFiles = []

  files.map((templateDir: string) => {
    const targetEjs = `${appName}/${templateDir.slice(module.length + 1)}`
    const target = targetEjs.split('.ejs').join('')
    listFiles.push({
      template: templateDir,
      target,
      props: props || null,
    })
  })

  return listFiles
}

export function getListModuleInfo(
  name: string,
  props,
  entityJsonPaths?: string
) {
  const PATH_MODULE_FILES = 'back-end/modules'

  const files = getPathsTemplate(PATH_MODULE_FILES)

  let moduleFiles = []

  files.map((templateDir: string) => {
    const targetWithEjs = `./${templateDir.slice(PATH_MODULE_FILES.length + 1)}`
    const target = targetWithEjs
      .split('.ejs')
      .join('')
      .replace('Xxxx', upperFirstLetter(name))
      .replace('xxxx', lowerFirstLetter(name))

    moduleFiles.push({
      template: templateDir,
      target,
      props: props || null,
    })
  })

  return moduleFiles
}

async function createTempFiles(templateToolbox, fileInfo) {
  await templateToolbox.generate({
    template: fileInfo.template,
    target: resolve('temp', fileInfo.target),
    props: fileInfo.props,
  })
}

export async function clearTempFiles() {
  const tempFilesPath = resolve('temp')
  rimraf.sync(tempFilesPath)
}

export async function createFiles(templateToolbox, filesInfoArray) {
  filesInfoArray.map(async (file) => {
    await createTempFiles(templateToolbox, file)

    const fileTempJson = parseJson(resolve('temp', file.target))
    const fileTempString = await parseString(fileTempJson)

    const isFileUserExists = await fileExists(file.target)

    if (isFileUserExists) {
      const fileUserJson = parseJson(file.target)

      const fileName = basename(file.target).replace(/\.[^/.]+$/, '')
      const fileExtension = basename(file.target).split('.').pop()

      let hasPatternFile: boolean

      Object.values(FileName).map(async (name) => {
        if (fileName === name) {
          const fileMergedString = mergeFiles(
            fileTempJson,
            fileUserJson,
            fileName
          )
          hasPatternFile = true
          await save(resolve(file.target), fileMergedString)
        } else {
          hasPatternFile = false
        }
      })

      if (!hasPatternFile) {
        const newNameFile = `${file.target.replace(
          /[^\/]*$/,
          ''
        )}${fileName}.${fileExtension} - [IN CONFLICT]`

        await save(resolve(newNameFile), fileTempString)
      }
    } else {
      await save(resolve(file.target), fileTempString)
    }
  })
}

export async function createEntity(entityPath) {
  console.log(entityPath)
}

function parseJson(filePath: string) {
  const content = readFileSync(filePath).toString()

  const contentArray = content.split('\n')

  const contentJson = contentArray.map((content, line) => {
    return { line, content }
  })

  return contentJson
}

export async function parseString(fileJson) {
  let content = []

  fileJson.map((file) => {
    content.push(JSON.parse(JSON.stringify(file.content)).replace('\r', ''))
  })

  const fileToString = content.join('\n')

  return fileToString
}

async function fileExists(filePath: string) {
  return jetpack.existsAsync(filePath)
}

async function save(filePath: string, fileString: string) {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, fileString)
}
