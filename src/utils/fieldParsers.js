/* eslint-disable max-len */
import { replace } from 'ramda'

export const withoutSpaceParse = (value) => {
  if (!value) return ''
  return replace(/ /g, '', value)
}

// eslint-disable-next-line consistent-return
export const phoneNumberParse = (value) => {
  if (!value) return ''

  const withoutSpaces = withoutSpaceParse(value)
  const onlyNumsAndSymbol = replace(/[^\d\W]/g, '', withoutSpaces)

  if (onlyNumsAndSymbol.length <= 4) {
    return `${onlyNumsAndSymbol.slice(0, 4)} `
  }
  else if (onlyNumsAndSymbol.length <= 6) {
    return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)}`
  }
  else if (onlyNumsAndSymbol.length <= 9) {
    return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)} ${onlyNumsAndSymbol.slice(6, 9)}`
  }
  else if (onlyNumsAndSymbol.length <= 11) {
    return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)} ${onlyNumsAndSymbol.slice(6, 9)} ${onlyNumsAndSymbol.slice(9, 11)}`
  }
  else if (onlyNumsAndSymbol.length <= 13 || onlyNumsAndSymbol.length > 13) {
    return `${onlyNumsAndSymbol.slice(0, 4)} ${onlyNumsAndSymbol.slice(4, 6)} ${onlyNumsAndSymbol.slice(6, 9)} ${onlyNumsAndSymbol.slice(9, 11)} ${onlyNumsAndSymbol.slice(11, 13)}`
  }
}

export const numberInputParse = (value, withSpace = true) => {
  if (!value) return ''

  const replaced = replace(',', '.', String(value))
  const output = replaced.replace(/[^\d.-]/g, '')

  const splitted = output.split('.')
  if (splitted.length > 2) {
    const [first, ...others] = splitted
    return first + '.' + others.filter(item => item).join('')
  }

  return output.replace(/\B(?=(\d{3})+(?!\d))/g, withSpace ? ' ' : '')
}
