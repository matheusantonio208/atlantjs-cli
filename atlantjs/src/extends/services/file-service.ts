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

export function getInfoToGenerateFiles(
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

  const fileWithChangesCli = parseArray(resolve('temp', fileInfo.target))
  const fileWithChangesCliString = await parseString(fileWithChangesCli)

  return { fileWithChangesCli, fileWithChangesCliString }
}

export async function clearTempFiles() {
  const tempFilesPath = resolve('temp')
  rimraf.sync(tempFilesPath)
}

export async function createFiles(templateToolbox, filesInfoArray) {
  filesInfoArray.map(async (file) => {
    const { fileWithChangesCli, fileWithChangesCliString } =
      await createTempFiles(templateToolbox, file)

    const isFileUserExists = await fileExists(file.target)

    if (isFileUserExists) {
      const userFile = parseArray(file.target)

      const userFileName = basename(file.target).replace(/\.[^/.]+$/, '')
      const fileExtension = basename(file.target).split('.').pop()

      const isSaveWithPatterns = await saveWithPatterns(
        userFileName,
        fileWithChangesCli,
        userFile,
        file.target
      )

      // if (!isSaveWithPatterns) {
      //   const newFileName = `${file.target.replace(
      //     /[^\/]*$/,
      //     ''
      //   )}${userFileName}.${fileExtension} - [IN CONFLICT]`

      //   await save(resolve(newFileName), fileWithChangesCliString)
      // }
    } else {
      await save(resolve(file.target), fileWithChangesCliString)
    }
  })
}

export async function createEntity(entityPath) {
  console.log(entityPath)
}

function parseArray(filePath: string) {
  const content = readFileSync(filePath).toString()

  const contentArray = content.split('\n')

  return contentArray
}

export async function parseString(fileArray) {
  return fileArray.join('\n')
}

async function fileExists(filePath: string) {
  return jetpack.existsAsync(filePath)
}

async function saveWithPatterns(
  nameFile,
  fileWithChangesCli,
  fileUser,
  target
) {
  Object.values(FileName).map(async (name) => {
    if (nameFile === name) {
      const fileMergedString = await mergeFiles(
        nameFile,
        fileWithChangesCli,
        fileUser
      )
      await save(resolve(target), fileMergedString)
      return true
    }
  })
  return false
}

async function save(filePath: string, fileString: string) {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, fileString)
}
