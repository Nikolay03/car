import React from 'react'
import { map, filter, pipe, split, propOr, prop } from 'ramda'
import PropTypes from 'prop-types'

import FilterSection from './FilterSection'

import { useCategoryData } from '~/view/Category/CategoryProvider'
import CategoryBlock from '~/view/Category/CategoryBlock'
import { useTranslate } from '~/utils/translate'

const emptyStr = ''
const getIds = (data, key) => pipe(
  propOr(emptyStr, key),
  split('-'),
  filter(Boolean),
  map(Number)
)(data)

const Filter = props => {
  const {
    initialValues,
    onChangeFilter
  } = props
  const { t, translateData } = useTranslate()

  const { categoryData } = useCategoryData()
  const filters = prop('children', categoryData) || prop('results', categoryData)

  // Render
  return (
    <>
      {filters.map((item, key) => {
        const id = item.id
        const name = translateData(item, 'name')
        const children = item.children
        const isLast = filters.length === key + 1
        const queryKey = 'category'
        const countryIds = getIds(initialValues, queryKey)
        return (
          <CategoryBlock key={id} isLast={isLast}>
            <FilterSection
              label={name}
              queryName={queryKey}
              ids={countryIds}
              list={children.map(i => ({ name: translateData(i, 'name'), id: i.id }))}
              onChange={(queryName, ids) => {
                const selectedIds = ids.join('-')
                onChangeFilter({ [queryName]: selectedIds })
              }}
            />
          </CategoryBlock>
        )
      })}
    </>
  )
}

Filter.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  onItemReset: PropTypes.func,
  queryParams: PropTypes.object
}
export default Filter
