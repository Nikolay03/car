export const get2D = num => {
  if (num.toString().length < 2) {
    return '0' + num
  }
  return num.toString()
}

export const getDuration = seconds => {
  const secs = get2D(seconds % 60)
  const mins = get2D(Math.floor(seconds / 60))

  return `${mins}:${secs}`
}
