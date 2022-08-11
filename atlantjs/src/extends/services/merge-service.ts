import { parseString } from './file-service'
import { filesStructure } from './files-structure'
export function mergeFiles(fileTempJson, fileUserJson, fileName: string) {
  const { sectionsUser, sectionsTemp } = getAllInfoJsonSection(
    fileTempJson,
    fileUserJson,
    fileName
  )

  const sectionsNames = Object.keys(sectionsUser).map((section) => section)

  let infoJsonMergedFile = {}

  sectionsNames.map((section, index) => {
    let isSameSection =
      sectionsUser[section].contentSection.join() ===
      sectionsTemp[section].contentSection.join()

    let lineSectionStart =
      sectionsUser[section].lineSectionStart <
      sectionsTemp[section].lineSectionStart
        ? sectionsUser[section].lineSectionStart
        : sectionsTemp[section].lineSectionStart

    Object.assign(infoJsonMergedFile, {
      [section]: {
        lineSectionStart,

        contentSection: isSameSection
          ? [
              `//! ${section}-start`,
              `<<<<<<< HEAD ${section}`,
              ...sectionsUser[section].contentSection,
              `=======`,
              ...sectionsTemp[section].contentSection,
              `>>>>>>> TEMP ${section}`,
              `//! ${section}-end`,
            ]
          : [
              `//! ${section}-start`,
              ...sectionsUser[section].contentSection,
              `//! ${section}-end`,
            ],
      },
    })
  })

  let fileUserArray = []

  fileUserJson.map((line) => {
    fileUserArray.push(line.content)
  })

  Object.keys(infoJsonMergedFile).map((section, index) => {
    const linesToExclude =
      sectionsUser[section].lineSectionEnd -
      sectionsUser[section].lineSectionStart

    for (let i = 0; i <= linesToExclude; i++) {
      fileUserArray[infoJsonMergedFile[section].lineSectionStart + i] = ''
    }

    fileUserArray.splice(
      infoJsonMergedFile[section].lineSectionStart,
      1 + index,
      infoJsonMergedFile[section].contentSection
    )
  })

  const fileUser = fileUserArray.filter((e) => e).join('\n\r')

  return fileUser
}

export function getAllInfoJsonSection(fileTempJson, fileUserJson, fileName) {
  const sectionsInfoJson = filesStructure(fileName)

  let sectionsUser = {}
  let sectionsTemp = {}

  sectionsInfoJson.map((section) => {
    const sectionUser = getSection(fileUserJson, section.name, section.range)
    const sectionTemp = getSection(fileTempJson, section.name, section.range)

    Object.assign(sectionsUser, sectionUser)
    Object.assign(sectionsTemp, sectionTemp)
  })

  return { sectionsUser, sectionsTemp }
}

export function getSection(
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

    if (line > lineSectionStart && line < lineSectionEnd) {
      contentSection.push(content)
    }
  })

  return { [sectionName]: { lineSectionStart, lineSectionEnd, contentSection } }
}
