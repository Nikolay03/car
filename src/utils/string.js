export function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getNumberDeclination (value, textForms = [], displayValue = true) {
  const num = Math.abs(value) % 100
  const numDivideRemainder = num % 10

  if (num > 10 && num < 20) {
    return displayValue ? `${value} ${textForms[2]}` : textForms[2]
  }
  if (numDivideRemainder > 1 && numDivideRemainder < 5) {
    return displayValue ? `${value} ${textForms[1]}` : textForms[1]
  }
  if (numDivideRemainder === 1) {
    return displayValue ? `${value} ${textForms[0]}` : textForms[0]
  }
  return displayValue ? `${value} ${textForms[2]}` : textForms[2]
}

export function getPlainTextFromHtml (html) {
  if (!html) return null
  return html.replace(/<[^>]+>/g, '')
}
