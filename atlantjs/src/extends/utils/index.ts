export function upperFirstLetter(str) {
  const uppered = str.replace(/^./, str[0].toUpperCase())

  return uppered
}

export function lowerFirstLetter(str) {
  const lowered = str.replace(/^./, str[0].toLowerCase())

  return lowered
}
