import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { length } from 'ramda'
import equal from 'fast-deep-equal'

import Checkbox, { CheckboxGroup } from '~/components/elements/Form/Checkbox'

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
      {list.map((item) => (
        <Checkbox key={item.id} value={item.id} label={item.name} />
      ))}
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
