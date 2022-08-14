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
import simpleGit from 'simple-git'

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

export async function createFiles(
  templateToolbox,
  infoFilesList,
  moduleA,
  moduleB
) {
  infoFilesList.map(async (file) => {
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
        file.target,
        moduleA,
        moduleB
      )

      if (!isSaveWithPatterns) {
        const newFileName = `${file.target.replace(
          /[^\/]*$/,
          ''
        )}${userFileName}.${fileExtension} - [IN CONFLICT]`

        await save(resolve(newFileName), fileWithChangesCliString)
      }
    } else {
      await save(resolve(file.target), fileWithChangesCliString)
    }
  })
}

export async function createEntity(nameEntity) {
  const PATH_ENTITY_FILE = resolve(
    '.dev',
    'entities',
    `${nameEntity}.entity.ts`
  )
  const PATH_DTO_FILE = resolve(
    'src',
    'modules',
    upperFirstLetter(nameEntity),
    'dto'
  )
  const PATH_SCHEMA_FILE = resolve('src', 'schemas')

  const dtoFiles = readdirSync(PATH_DTO_FILE)

  const { userEntity } = require(PATH_ENTITY_FILE)

  const properties = Object.keys(userEntity)
  let schemaPropertiesFile = []
  let dtoPropertiesFile = []
  let dtoConstructorFile = []

  properties.map((property) => {
    const type = userEntity[property].type
    const require = userEntity[property].required ?? false
    const unique = userEntity[property].unique ?? false

    Object.keys(userEntity[property]).map((subProperty) => {
      switch (subProperty) {
        case 'required':
        case 'unique':
        case 'type':
        case 'default':
        case 'enum':
          break
        default:
          console.log(userEntity[property])
          break
      }
    })

    schemaPropertiesFile.push(`    ${[property]}: {
      type: ${upperFirstLetter(type.toString())},
      unique: ${unique},
      require: ${require}
    },`)

    dtoPropertiesFile.push(`  ${property}: ${type};`)

    dtoConstructorFile.push(`    this.${property} = body?.${property};`)
  })

  const schemaFile = [
    '//! properties-start',
    ...schemaPropertiesFile,
    '//! properties-end',
  ]

  const dtoFile = [
    '//! properties-start',
    ...dtoPropertiesFile,
    '//! properties-end',
    '//! constructor-start',
    ...dtoConstructorFile,
    '//! constructor-end',
  ]

  dtoFiles.map(async (file) => {
    const fileInString = parseArray(`${PATH_DTO_FILE}/${file}`)
    const dtoFileMergedString = await mergeFiles(
      'dto',
      dtoFile,
      fileInString,
      'WITHOUT',
      'WITH'
    )
    await save(resolve(`${PATH_DTO_FILE}/${file}`), dtoFileMergedString)
  })

  const fileSchemaInString = parseArray(
    `${PATH_SCHEMA_FILE}/${upperFirstLetter(nameEntity)}.schema.ts`
  )
  const schemaFileMergedString = await mergeFiles(
    'schema',
    schemaFile,
    fileSchemaInString,
    'WITHOUT',
    'WITH'
  )
  await save(
    resolve(`${PATH_SCHEMA_FILE}/${upperFirstLetter(nameEntity)}.schema.ts`),
    schemaFileMergedString
  )
}

export async function verifyConflicts(name) {
  const git = simpleGit(name)

  try {
    const status = await git.status()
    const files = status.files

    let filesInConflict = []

    files.map((file) => {
      const pathFile = file.path
      let fileContent
      switch (file.working_dir) {
        case 'M':
        case 'U':
          {
            fileContent = parseArray(`./${name}/${pathFile}`)

            fileContent.map((content) => {
              if (content.trim().startsWith('<<<<<<<')) {
                filesInConflict.push(file.path)
              }
            })

            const hasConflictTagInNameFile =
              pathFile.indexOf('- [CONFLICT]') !== -1

            if (hasConflictTagInNameFile) {
              filesInConflict.push(file.path)
            }
          }
          break
        default:
          break
      }
    })

    return filesInConflict.length > 0
  } catch (error) {
    console.debug(error)
  }
}

function parseArray(filePath: string) {
  const path = resolve(filePath)

  const content = readFileSync(path).toString()

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
  target,
  moduleA,
  moduleB
) {
  Object.values(FileName).map(async (name) => {
    if (nameFile === name) {
      const fileMergedString = await mergeFiles(
        nameFile,
        fileWithChangesCli,
        fileUser,
        moduleA,
        moduleB
      )
      await save(resolve(target), fileMergedString)
      return false
    }
  })
  return true
}

async function save(filePath: string, fileString: string) {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, fileString)
}
