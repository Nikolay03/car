import React from 'react'
import styled from 'styled-components'
import { map, pathOr, pipe, split, propOr, filter, isEmpty } from 'ramda'
import PropTypes from 'prop-types'

import FilterSection from './FilterSection'

const FilterBlock = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  background: #fff;
  border-radius: 4px;
  width: 267px;
  margin: 35px 0 40px;
`
const NoOptions = styled('div')`
  padding: 15px 20px;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;
`

const emptyStr = ''
const getIds = (data, key) => pipe(
  propOr(emptyStr, key),
  split('-'),
  filter(Boolean),
  map(Number)
)(data)

const defArr = []

const Filter = props => {
  const {
    data,
    initialValues,
    onChange,
    queryParams
  } = props

  // Const
  const brands = pathOr(defArr, ['brands'], data)
  const options = pathOr(defArr, ['option'], data)
  const countryIds = getIds(initialValues, 'country')
  const isEmptyOptions = true

  // Options
  // const optionsContent =
  //   <>
  //     {!isEmpty([]) && (
  //       <FilterSection
  //         label={'Страна'}
  //         queryName={'country'}
  //         ids={[]}
  //         list={[{ name: 'aaa', id: 1 }]}
  //         onChange={onChange}
  //       />
  //     )}
  //   </>

  // Render
  return (
    <FilterBlock>
      {!isEmptyOptions
        ? optionsContent
        : <NoOptions>Нет фильтров</NoOptions>}
    </FilterBlock>
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
