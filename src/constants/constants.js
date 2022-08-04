import { range } from 'ramda'

export const PRICE_TYPES = [
  {
    id: 'max',
    name: 'По цене (Самые дорогие)'
  },
  {
    id: 'min',
    name: 'По цене (Самые дешевые)'
  }
]

export const phones = [
  { name: '998 (95) 342 - 42 - 42', value: '+998953424242' },
  { name: '998 (95) 342 - 42 - 42', value: '+998953424241' }
]

export const QUANTITY_LIST = range(1, 10).map(i => ({
  id: i,
  name: String(i)
}))
