import Cookies from 'js-cookie'

const COOKIE_TOKEN = 'token'
const COOKIE_LOCALE = 'NEXT_LOCALE'

function getCookie (cookieName) {
  if (typeof window !== 'undefined') {
    return Cookies.get(cookieName)
  }
  return ''
}

export function getToken () {
  return getCookie(COOKIE_TOKEN)
}

export function setToken (token) {
  Cookies.set(COOKIE_TOKEN, token, { path: '/' })
}

export function removeToken () {
  Cookies.remove(COOKIE_TOKEN)
}

export function setLocale (locale) {
  Cookies.set(COOKIE_LOCALE, locale, { path: '/' })
}
