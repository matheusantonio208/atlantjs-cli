export function upperFirstLetter(str) {
  const uppered = str.replace(/^./, str[0].toUpperCase())

  return uppered
}

export function lowerFirstLetter(str) {
  const lowered = str.replace(/^./, str[0].toLowerCase())

  return lowered
}

export function removeDuplicates(data) {
  return data.filter((value, index) => data.indexOf(value) === index)
}
