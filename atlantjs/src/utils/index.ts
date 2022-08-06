import * as fs from 'fs'

export function upperFirstLetter(str) {
  const uppered = str.replace(/^./, str[0].toUpperCase())

  return uppered
}

export function lowerFirstLetter(str) {
  const lowered = str.replace(/^./, str[0].toLowerCase())

  return lowered
}

export function readFile(path: string) {
  const content = fs.readFileSync(path)

  return content
}

export function parseJson(file: string) {}
