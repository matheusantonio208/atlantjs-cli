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
  moduleA,
  moduleB,
  nameModuleA,
  nameModuleB
) {
  let inConflict = !(moduleA.join() === moduleB.join())
  let sectionMerged = []

  if (inConflict) {
    sectionMerged = [
      `<<<<<<< ${nameModuleB} ==> ${section}`,
      ...moduleB,
      `=======`,
      ...moduleA,
      `>>>>>>> ${nameModuleA} ==> ${section}`,
    ]
  } else {
    sectionMerged = [...moduleA]
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

  let startLine = 0;
  let endLine = 0;
  let resultBreads = 1;

  for(let i = 0; i < file.length; i ++) {

    if(file[i].trim().includes(tags.start.trim())) {
      startLine = i;
      resultBreads ++
    }

    if(file[i].includes('}')) {
      resultBreads --;
    }

    if(resultBreads === -1 ) {
      endLine = i - 1
      resultBreads --
    }

    if(!(resultBreads === -1  && file[i].includes('}') &&file[i].trim().includes(tags.start.trim()))) {
      console.debug({i, cont: file[i]})
    }
}

  const amountLines = endLine - startLine

  return { startLine, endLine, amountLines }
}
