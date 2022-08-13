import { parseString } from './file-service'
import { filesStructure } from './files-structure'
export function mergeFiles(
  fileName: string,
  fileWithChangesCli,
  fileUser,
  moduleA,
  moduleB
) {
  const sections = filesStructure(fileName)

  const { sectionsUser, sectionsWithChangesCli } = getContentSections(
    fileWithChangesCli,
    fileUser,
    sections
  )

  let fileMerged = []
  let rangeOriginFileUser = {}

  sections.map((section) => {
    const sectionMerged = mergeSection(
      section.name,
      sectionsUser[section.name],
      sectionsWithChangesCli[section.name],
      moduleA,
      moduleB
    )

    if (fileMerged.length === 0) {
      rangeOriginFileUser = getRangeSection(fileUser, section.tags)
      fileMerged = excludeLinesSection(fileUser, rangeOriginFileUser)
    } else {
      rangeOriginFileUser = getRangeSection(fileMerged, section.tags)
      fileMerged = excludeLinesSection(fileMerged, rangeOriginFileUser)
    }
    const newRangeFileUser = getRangeSection(fileMerged, section.tags)

    fileMerged.splice(newRangeFileUser.startLine + 1, 0, ...sectionMerged)
  })

  const fileMergedString = parseString(fileMerged)

  return fileMergedString
}

function mergeSection(
  section,
  sectionUser,
  sectionWithChangesCli,
  moduleA,
  moduleB
) {
  let inConflict = !(sectionUser.join() === sectionWithChangesCli.join())
  let sectionMerged = []

  if (inConflict) {
    sectionMerged = [
      `<<<<<<< ${moduleA} ==> ${section}`,
      ...sectionUser,
      `=======`,
      ...sectionWithChangesCli,
      `>>>>>>> ${moduleB} ==> ${section}`,
    ]
  } else {
    sectionMerged = [...sectionUser]
  }

  return sectionMerged
}

function excludeLinesSection(file, rangeFile) {
  for (let i = 1; i < rangeFile.amountLines; i++) {
    file[rangeFile.startLine + i] = '[EXCLUDE]'
  }

  const fileUserArrayLineExcluded = file.filter((e) => {
    return e !== '[EXCLUDE]' ?? e
  })

  return fileUserArrayLineExcluded
}

export function getContentSections(fileWithChangesCli, fileUser, sections) {
  let sectionsUser = {}

  let sectionsWithChangesCli = {}

  sections.map((section) => {
    const sectionUser = getContentSection(fileUser, section.name, section.tags)
    const sectionWithChangesCli = getContentSection(
      fileWithChangesCli,
      section.name,
      section.tags
    )

    Object.assign(sectionsUser, sectionUser)
    Object.assign(sectionsWithChangesCli, sectionWithChangesCli)
  })

  return { sectionsUser, sectionsWithChangesCli }
}

export function getContentSection(file, section, tags) {
  let contentSection = []

  const { startLine, endLine } = getRangeSection(file, tags)

  file.map((content, line) => {
    if (line > startLine && line < endLine) {
      contentSection.push(content)
    }
  })

  return { [section]: contentSection }
}

function getRangeSection(file, tags) {
  let startLine
  let endLine
  const { start, end } = tags

  file.map((content, line) => {
    if (content.trim().startsWith(start.trim())) {
      startLine = line
    } else if (content.trim().startsWith(end.trim())) {
      endLine = line
    }
  })

  const amountLines = endLine - startLine

  return { startLine, endLine, amountLines }
}
