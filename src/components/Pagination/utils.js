import { __, add, curry, defaultTo, divide, pipe, range } from 'ramda'

import { getParamFormHistory } from '~/utils/url'

export const PAGE_SIZE = 10
export const ONE = 1

export const getPageList = (count, pageSize = PAGE_SIZE) => pipe(
  divide(__, pageSize),
  Math.ceil,
  add(ONE),
  range(ONE)
)(count)

export const getCurrentPage = curry((key, router) =>
  pipe(
    getParamFormHistory(key),
    defaultTo(ONE),
    Number
  )(router)
)
