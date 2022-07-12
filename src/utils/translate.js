import { prop, path } from 'ramda'
import { sprintf } from 'sprintf-js'
import { useRouter } from 'next/router'

import { capitalize } from './string'

import locales from '~/locales'

function translate (key, locale) {
  return path([key, locale], locales) || path([key, 'ru'], locales)
}
export function useTranslate () {
  const { locale } = useRouter()

  function t (key, params) {
    return params
      ? sprintf(translate(key, locale), params)
      : translate(key, locale)
  }

  function translateData (obj, valueKey) {
    const name = valueKey + capitalize(locale) /* titleRu, titleEn ... */
    const nameDefault = valueKey + capitalize('ru') /* titleRu: ru locale */
    const result = prop(name, obj)
    return result || prop(nameDefault, obj)
  }

  return { t, translateData }
}
