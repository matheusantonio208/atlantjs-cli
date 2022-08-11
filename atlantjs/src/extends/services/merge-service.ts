import { filesStructure } from './files-structure'
export function mergeFiles(fileTempJson, fileUserJson, fileName: string) {
  const { sectionsUser, sectionsTemp } = getAllInfoJsonSection(
    fileTempJson,
    fileUserJson,
    fileName
  )

  const sectionsNames = Object.keys(sectionsUser).map((section) => section)

  const contentMergedSection = getContentMergedSection(
    sectionsNames,
    sectionsUser,
    sectionsTemp
  )

  const fileUserArray = getFileUserInArray(fileUserJson)
  let fileUser = []
  const sectionsToMerge = Object.keys(contentMergedSection)

  sectionsToMerge.map((section) => {
    const userFileExcludeLines = excludeContentInLinesBeforeMerge(
      fileUserArray,
      sectionsUser,
      contentMergedSection[section].lineSectionStart,
      section
    )

    userFileExcludeLines.splice(
      contentMergedSection[section].lineSectionStart,
      0,
      ...contentMergedSection[section].contentSection
    )

    fileUser = userFileExcludeLines.filter((e) => {
      return e !== '[EXCLUDE]' ?? e
    })
  })

  let document = ''

  fileUser.map((file) => {
    document += `${file}\n`
  })

  return document
}

function getFileUserInArray(fileUserJson) {
  let fileUserArray = []

  fileUserJson.map((line) => {
    fileUserArray.push(line.content)
  })

  return fileUserArray
}

function getContentMergedSection(sectionsNames, sectionsUser, sectionsTemp) {
  let infoJsonMergedFile = {}
  sectionsNames.map((section, index) => {
    let isSameSection =
      sectionsUser[section].contentSection.join() ===
      sectionsTemp[section].contentSection.join()

    const sections = Object.keys(infoJsonMergedFile)
    let nextLineStart

    if (index !== 0) {
      let beforeSection = infoJsonMergedFile[sections[index - 1]]
      let lengthLineBackSection = beforeSection.contentSection.length

      nextLineStart =
        sectionsUser[section].lineSectionStart + lengthLineBackSection
    } else {
      nextLineStart = sectionsUser[section].lineSectionStart
    }

    Object.assign(infoJsonMergedFile, {
      [section]: {
        lineSectionStart: nextLineStart,
        contentSection: !isSameSection
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

  return infoJsonMergedFile
}

function excludeContentInLinesBeforeMerge(
  fileUserArray,
  sectionsUser,
  nextLineToStartSection,
  section
) {
  const linesToExclude =
    sectionsUser[section].lineSectionEnd -
    sectionsUser[section].lineSectionStart

  for (let i = 0; i <= linesToExclude; i++) {
    fileUserArray[nextLineToStartSection + i] = '[EXCLUDE]'
  }

  return fileUserArray
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
