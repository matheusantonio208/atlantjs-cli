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

function getAllFiles(templateFolder: string, arrayOfFiles?) {
  const PATH_TEMPLATE = resolve('src', 'templates', templateFolder)

  let files = readdirSync(PATH_TEMPLATE)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    const PATH_FILE = `${PATH_TEMPLATE}/${file}`
    if (statSync(PATH_FILE).isDirectory()) {
      arrayOfFiles = getAllFiles(PATH_FILE, arrayOfFiles)
    } else {
      arrayOfFiles.push(join(__dirname, PATH_TEMPLATE, '/', file))
    }
  })

  let templates = []

  arrayOfFiles.map((directory, index) => {
    directory = directory.toString()
    templates.push(directory.substring(directory.indexOf(templateFolder)))
  })

  return templates
}

async function createTempFiles(templateToolbox, fileInfo) {
  await templateToolbox.generate({
    template: fileInfo.template,
    target: resolve('temp', fileInfo.target),
    props: fileInfo.props,
  })
}

async function save(filePath: string, fileString: string) {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, fileString)
}

export async function removeTempFiles() {
  const tempFilesPath = resolve('temp')
  rimraf.sync(tempFilesPath)
}

export async function createFiles(templateToolbox, filesInfo) {
  filesInfo.map(async (file) => {
    await createTempFiles(templateToolbox, file)
    const fileTempJson = parseJson(resolve('temp', file.target))

    const isFileUserExists = await fileExists(file.target)

    if (isFileUserExists) {
      const fileUserJson = parseJson(file.target)

      const fileName = basename(file.target).replace(/\.[^/.]+$/, '')

      if (fileName === FileName.API_CONFIG) {
        const fileMergedJson = mergeFiles(fileTempJson, fileUserJson, fileName)
        fileMergedJson // const fileMergedString = await parseString(fileMergedJson)

        // await save(resolve(file.target), fileMergedString)
      }
    }

    const fileTempString = await parseString(fileTempJson)

    await save(resolve(file.target), fileTempString)
  })
}

function parseJson(filePath: string) {
  const content = readFileSync(filePath).toString()

  const contentArray = content.split('\n')

  const contentJson = contentArray.map((content, line) => {
    return { line, content }
  })

  return contentJson
}

async function parseString(fileJson) {
  let content = []

  fileJson.map((file, index) => {
    content.push(JSON.parse(JSON.stringify(file.content)).replace('\r', ''))
  })

  const fileToString = content.join('\n')

  return fileToString
}

async function fileExists(filePath: string) {
  return jetpack.existsAsync(filePath)
}

export function jsonFilesInfo(module: string, appName: string, props?) {
  const files = getAllFiles(module)

  let coreFiles = []

  files.map((templateDir: string) => {
    const targetEjs = `${appName}/${templateDir.slice(module.length + 1)}`
    const target = targetEjs.split('.ejs').join('')
    coreFiles.push({
      template: templateDir,
      target,
      props: props || null,
    })
  })

  return coreFiles
}

enum FileName {
  API_CONFIG = 'api-config',
  PACKAGE = 'package',
  SERVICE = 'service',
  ENV_EXAMPLE = 'env-example',
  DOCKER_FILE = 'docker-file',
  DOCKER_COMPOSE = 'docker-compose',
  ROUTES = 'routes',
}

function mergeFiles(fileTempJson, fileUserJson, fileName: string) {
  const { sectionsUser, sectionsTemp } = getAllRanges(
    fileTempJson,
    fileUserJson,
    fileName
  )
  sectionsTemp
  sectionsUser

  let fileUserArray = []

  fileUserJson.map((line) => {
    fileUserArray.push(line.content)
  })

  fileUserArray.splice(
    sectionsUser['imports'].lineSectionEnd,
    0,
    ...sectionsTemp['imports'].contentSection
  )

  fileUserArray.splice(
    sectionsUser['imports'].lineSectionStart,
    0,
    '<<<<<<< HEAD'
  )

  fileUserArray.splice(sectionsUser['imports'].lineSectionEnd + 1, 0, '=======')
  fileUserArray.splice(
    sectionsUser['imports'].lineSectionEnd +
      sectionsTemp['imports'].contentSection.length +
      1,
    0,
    '>>>>>>> TEMP'
  )
  console.log(fileUserArray)
}

function getAllRanges(fileTempJson, fileUserJson, fileName) {
  const sectionsApiFile = [
    {
      name: 'constructor',
      range: {
        contentSectionStart: 'constructor() {',
        contentSectionEnd: '// DatabaseDB.start();',
      },
    },
    {
      name: 'imports',
      range: {
        contentSectionStart: 'import',
        contentSectionEnd: 'class ApiConfig {',
      },
    },
  ]

  if (fileName === FileName.API_CONFIG) {
    let sectionsUser = {}
    let sectionsTemp = {}

    sectionsApiFile.map((section) => {
      const sectionName = section.name
      const sectionRange = section.range

      Object.assign(
        sectionsUser,
        getRange(fileUserJson, sectionName, sectionRange)
      )
      Object.assign(
        sectionsTemp,
        getRange(fileTempJson, sectionName, sectionRange)
      )
    })

    return { sectionsUser, sectionsTemp }
  }
}

function getRange(
  fileJson,
  sectionName,
  { contentSectionStart, contentSectionEnd }
) {
  let lineSectionStart
  let lineSectionEnd
  let contentSection = []

  fileJson.filter((lineJson) => {
    const { line, content } = lineJson

    if (content.trim().startsWith(contentSectionStart.trim())) {
      lineSectionStart === undefined
        ? (lineSectionStart = line)
        : lineSectionStart
    }

    if (content.trim().startsWith(contentSectionEnd.trim())) {
      lineSectionEnd = line
    }
  })

  fileJson.filter((lineJson) => {
    const { line, content } = lineJson

    if (line >= lineSectionStart && line < lineSectionEnd) {
      contentSection.push(content)
    }
  })

  return { [sectionName]: { lineSectionStart, lineSectionEnd, contentSection } }
}
