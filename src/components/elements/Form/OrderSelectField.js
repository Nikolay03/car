import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { mediaQueries } from '~/constants/mediaQueries'
import BorderBlock from '~/components/elements/BorderBlock'
import { getFieldError } from '~/utils/form'
import InputError from '~/components/elements/Form/InputError'

const Wrapper = styled.div`
  grid-gap: 15px;
  display: grid;
  flex-wrap: wrap;
  grid: 1fr / ${({ length }) => `repeat(${length}, 1fr)`};
  @media ${mediaQueries.tabletL} {
    grid: 1fr / 1fr;
  }
`

const EMPTY_OBJ = {}

const OrderSelectField = props => {
  const {
    input,
    error,
    meta,
    dataProps
  } = props
  const inputError = error || getFieldError(meta)

  const onChange = value => input.onChange(value)
  return (
    <>
      <Wrapper length={dataProps.length === 1 ? 2 : dataProps.length}>
        {dataProps.map(item => {
          const isActive = input.value && input.value.id === item.id
          const toggleItem = isActive ? EMPTY_OBJ : item
          return (
            <BorderBlock
              key={item.id}
              name={item.name}
              info={item.info}
              onClick={() => onChange(toggleItem)}
              isActive={isActive}
            />
          )
        })}
      </Wrapper>
      {inputError && (
        <InputError>
          {inputError}
        </InputError>
      )}
    </>

  )
}

OrderSelectField.propTypes = {
  input: PropTypes.object,
  data: PropTypes.any
}

export default OrderSelectField
