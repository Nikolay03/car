import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { filter, includes, isEmpty, map, not, pipe, pluck } from 'ramda'

import { SwitchContainer } from '../Switches'

import Accordion from '~/components/Accordion'

const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.65em 0px 0px 0px;
  height: ${props => props.count > 7 ? '200px' : 'auto'};
  overflow-y: scroll;
  overflow-x: hidden;
`

const Checkboxes = styled('div')`
  ${props =>
    props.mode === 'inline' &&
    css`
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -12px;
      & ${SwitchContainer} {
        margin-right: 25px;
        &:last-child {
          margin-bottom: 12px;
        }
      }
    `
}`

const CheckboxGroup = props => {
  const {
    value,
    list,
    children,
    label,
    onChange,
    mode,
    count,
    ...rest
  } = props

  const [checkedValues, setCheckedValues] = React.useState(value)

  const hasIn = pipe(
    pluck('id'),
    map((val) => includes(val, value)),
    filter(i => i),
    isEmpty,
    not
  )(list)
  React.useEffect(() => {
    setCheckedValues(value)
  }, [value])

  const onChangeItem = (v, isChecked) => {
    const formedValues = isChecked
      ? [...checkedValues, v]
      : checkedValues.filter(item => item !== v)
    setCheckedValues(formedValues)
    if (typeof onChange === 'function') {
      onChange(formedValues)
    }
  }

  return (
    <Accordion title={label} array={list} initialValue={hasIn}>
      <Group {...rest} count={count}>
        <Checkboxes mode={mode}>
          {React.Children.map(children, (child, key) => {
            const checkboxProps = child.props
            const childValue = checkboxProps.value
            return React.cloneElement(child, {
              key,
              ...checkboxProps,
              checked: checkedValues.includes(childValue),
              onChange: isChecked => onChangeItem(childValue, isChecked)
            })
          })}
        </Checkboxes>
      </Group>
    </Accordion>
  )
}

CheckboxGroup.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  count: PropTypes.number,
  mode: PropTypes.oneOf(['inline', 'block', 'column'])
}

CheckboxGroup.defaultProps = {
  mode: 'inline',
  value: []
}

export default CheckboxGroup
