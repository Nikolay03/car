import React from 'react'
import styled from 'styled-components'
import { map, filter, pipe, split, propOr, prop, isEmpty, omit, unnest } from 'ramda'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { sprintf } from 'sprintf-js'

import FilterSection from './FilterSection'

import { useCategoryData } from '~/view/Category/CategoryProvider'
import CategoryBlock from '~/view/Category/CategoryBlock'
import { useTranslate } from '~/utils/translate'
import { CATEGORY_ITEM_URL } from '~/constants/routes'

const emptyStr = ''
const getIds = (data, key) => pipe(
  propOr(emptyStr, key),
  split('-'),
  filter(Boolean),
  map(Number)
)(data)

const deepTree = pipe(
  map(i => !isEmpty(i.children) ? [{ isParent: true, ...i }, ...i.children] : i),
  unnest
)

const Hover = styled.div`
  position: relative;
  &:after {
    content: " ";
    position: absolute;
    bottom: -2px;
    left: 0px;
    width: 0%;
    height: 1px;
    background-color: black;
    transform-origin: 0% 100%;
    transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
  };
  &:hover {
    font-weight: 600;
    &:after {
      width: 100%;
    };
  };
`

const queryKey = 'category'
const Filter = props => {
  const {
    initialValues,
    onChangeFilter
  } = props
  const { translateData } = useTranslate()

  const { categoryData } = useCategoryData()
  const filters = prop('children', categoryData) || prop('results', categoryData)
  // Render
  const queryObj = omit([queryKey], initialValues)
  return (
    <>
      {filters.map((item, key) => {
        const id = item.id
        const parent = item.parent
        const children = item.children
        const name = translateData(item, 'name')
        const isLink = !parent && isEmpty(children)
        const isLast = filters.length === key + 1
        const deep = deepTree(children)
        const countryIds = getIds(initialValues, queryKey)
        const label = isLink
          ? (
            <Link href={{
              pathname: sprintf(CATEGORY_ITEM_URL, id),
              query: queryObj
            }}>
              <Hover>
                {name}
              </Hover>
            </Link>
          )
          : name
        return (
          <CategoryBlock key={id} isLast={isLast}>
            <FilterSection
              label={label}
              queryName={queryKey}
              ids={countryIds}
              list={deep.map(i => ({ ...i, name: translateData(i, 'name'), id: i.id }))}
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
