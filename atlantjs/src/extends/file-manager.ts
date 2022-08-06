import { resolve, dirname } from 'path'
import * as fs from 'fs'
import * as jetpack from 'fs-jetpack'

export async function createTempFiles(template, file) {
  await template.generate({
    template: file.template,
    target: resolve('temp', file.target),
    props: file.props,
  })
}

export function parseJson(filePath) {
  const content = fs.readFileSync(filePath).toString()

  const contentArray = content.split('\n')

  const contentJson = contentArray.map((content, line) => {
    return { line, content }
  })
  console.log(
    '🚀 ~ file: file-manager.ts ~ line 21 ~ contentJson ~ contentJson',
    contentJson
  )

  return contentJson
}

export async function parseString(fileJson) {
  const content = fileJson.toString()
  return content
}

export async function save(filePath, fileString) {
  fs.mkdirSync(dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, fileString)
}

export async function fileExists(file) {
  return jetpack.existsAsync(file.target)
}
