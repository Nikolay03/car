import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { find, length, propEq } from 'ramda'
import styled from 'styled-components'
import equal from 'fast-deep-equal'

import Checkbox, { CheckboxGroup } from '~/components/elements/Form/Checkbox'

const SubTitle = styled.p`
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 14px;
`

const FilterSection = props => {
  const { label, queryName, ids, onChange, list } = props
  const count = length(list)
  return (
    <CheckboxGroup
      list={list}
      label={label}
      mode={'column'}
      count={count}
      value={ids}
      onChange={values => onChange(queryName, values)}
    >
      {list.map((item) =>
        item?.isParent
          ? (
            <SubTitle key={item.id}>{item.name}</SubTitle>
          )
          : (
            <Checkbox
              key={item.id}
              value={item.id}
              label={item.name}
              style={find(propEq('id', item.parent))(list) ? { marginLeft: '20px' } : {}}
            />
          )
      )}
    </CheckboxGroup>
  )
}

FilterSection.propTypes = {
  queryName: PropTypes.string,
  label: PropTypes.string,
  ids: PropTypes.array,
  onChange: PropTypes.func,
  list: PropTypes.array
}
export default memo(FilterSection, equal)
