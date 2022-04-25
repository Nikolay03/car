import { is, prop } from 'ramda'

import request from '~/utils/request'

export function getListData (data, error) {
  return {
    error,
    count: prop('count', data) || 0,
    results: is(Array, data) ? data : prop('results', data) || []
  }
}

export function getDetailData (data = {}, error) {
  return { error, data }
}

export async function fetchData (api, params = {}) {
  const { req, ...restParams } = params
  const res = await request(req).get(api, restParams)
  return prop('data', res)
}
