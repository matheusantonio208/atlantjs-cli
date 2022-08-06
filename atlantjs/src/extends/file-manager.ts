import { resolve, dirname, join } from 'path'
import * as jetpack from 'fs-jetpack'
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs'

export async function createTempFiles(template, file) {
  await template.generate({
    template: file.template,
    target: resolve('temp', file.target),
    props: file.props,
  })
}

export function parseJson(filePath) {
  const content = readFileSync(filePath).toString()

  const contentArray = content.split('\n')

  const contentJson = contentArray.map((content, line) => {
    return { line, content }
  })

  return contentJson
}

export async function parseString(fileJson) {
  let content = []

  fileJson.map((file, index) => {
    content.push(JSON.parse(JSON.stringify(file.content)).replace('\r', ''))
  })

  const fileToString = content.join('\n')

  return fileToString
}

export async function save(filePath, fileString) {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, fileString)
}

export async function fileExists(file) {
  return jetpack.existsAsync(file.target)
}

const getAllFiles = function (templateFolder, arrayOfFiles?) {
  const dirPath = resolve('src', 'templates', templateFolder)
  let files = readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(join(__dirname, dirPath, '/', file))
    }
  })

  let templates = []

  arrayOfFiles.map((directory, index) => {
    directory = directory.toString()
    templates.push(directory.substring(directory.indexOf(templateFolder)))
  })

  return templates
}

export function createFiles(module: string, appName: string, props?) {
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