import { prop } from 'ramda'

import request from '~/utils/request'

function searchToQuery (search) {
  const urlParams = new URLSearchParams(search)
  return Object.fromEntries(urlParams)
}

export function fetcher (url, search, params = {}) {
  const queryParams = searchToQuery(search)
  const formedParams = { ...queryParams, ...params }
  return request().get(url, formedParams)
    .then(prop('data'))
}

export function infiniteFetcher (url, jsonParams) {
  const params = JSON.parse(jsonParams)
  return request().get(url, params)
    .then(prop('data'))
}
