export function upperFirstLetter(str) {
  // converting first letter to uppercase
  const uppered = str.replace(/^./, str[0].toUpperCase())

  return uppered
}

export function lowerFirstLetter(str) {
  // converting first letter to uppercase
  const lowered = str.replace(/^./, str[0].toLowerCase())

  return lowered
}
