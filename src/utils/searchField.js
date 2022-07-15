import { curry, find, path, propEq } from 'ramda'

export const getStaticOptions = (search, list) => Promise.resolve(list)

export const getStaticOption = (id, list) => Promise.resolve(find(propEq('id', id))(list))

export const defaultGetText = curry((text, obj) => path(text, obj))

export const defaultGetValue = curry((value, obj) => path(value, obj))
