import { includes, is, prop } from 'ramda'

import toCamelCase from './toCamelCase'

export default function transformResponse (data, response) {
  const CONTENT_TYPE_JSON = 'application/json'
  const responseContentType = prop('content-type', response)

  if (responseContentType && includes(CONTENT_TYPE_JSON, responseContentType)) {
    return toCamelCase(JSON.parse(data))
  }

  if (is(Object, data) || is(Array, data)) {
    return toCamelCase(data)
  }

  return data
}
