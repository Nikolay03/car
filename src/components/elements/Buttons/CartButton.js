import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MinusCircle, PlusCircle, Trash2 } from 'react-feather'

import numberFormat from '~/utils/numberFormat'

const StyledCartButton = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-radius: 7px;
  height: ${({ height }) => height};
  min-width: ${({ minWidth }) => minWidth};
  padding: ${({ height }) => Number.parseInt(height) > 35 ? '0 40px' : '0 30px'};
  font-weight: 500;
  border: ${({ withDelete, theme }) => withDelete ? `1px solid ${theme.palette.primary}` : '1px solid #aeb2b7'};
  outline: 0;
  //margin-top: 10px;
  text-align: center;
  & > button{
    padding: ${({ height }) => Number.parseInt(height) > 35 ? '0 8px' : '0 6px'};
  }
`
const MinusButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: 0;
  cursor: ${({ disabled }) => disabled ? 'no-drop' : 'pointer'};
  svg{
    stroke: #eb4225;
    font-size: ${({ height }) => Number.parseInt(height) > 35 ? '24px' : '18px'};
    width: ${({ height }) => Number.parseInt(height) > 35 ? '24px' : '18px'};
    height: ${({ height }) => Number.parseInt(height) > 35 ? '24px' : '18px'};
  }
`
const PlusButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: 0;
  cursor: pointer;
  svg{
    font-size: ${({ height }) => Number.parseInt(height) > 35 ? '24px' : '18px'};
    width: ${({ height }) => Number.parseInt(height) > 35 ? '24px' : '18px'};
    height: ${({ height }) => Number.parseInt(height) > 35 ? '24px' : '18px'};
  }
`
const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize};
  line-height: ${({ fontSize }) => fontSize};
  text-align: center;
  color: #242f3b;
  width: 100%;
  cursor: default;
  user-select: none;
`

const CartButton = props => {
  const {
    amount,
    onChange,
    onDelete,
    withDelete,
    onAdd,
    onRemove,
    fontSize = '16px',
    measurement = 'шт',
    minWidth = '112px',
    height = '46px',
    withSuffix,
    ref
  } = props

  const [counter, setCounter] = useState(amount)

  const isCustomWeight = measurement &&
    (measurement.toLowerCase() === 'кг' || measurement.toLowerCase() === 'kg')

  useEffect(() => {
    setCounter(amount)
  }, [amount])

  const handleRemove = () => {
    const value = counter - 1
    setCounter(value)
    onRemove ? onRemove(value) : onChange(value)
  }
  const handleAdd = () => {
    const value = counter + 1
    setCounter(value)
    onAdd ? onAdd(value) : onChange(value)
  }

  return (
    <StyledCartButton
      withDelete={withDelete}
      minWidth={minWidth}
      height={height}
      ref={ref}
    >
      {((isCustomWeight && counter < 0.3) || (!isCustomWeight && counter < 2)) && withDelete
        ? (
          <MinusButton
            onClick={onDelete}
            height={height}
          >
            <Trash2 />
          </MinusButton>
        )
        : (
          <MinusButton
            counter={counter}
            onClick={handleRemove}
            disabled={((isCustomWeight && counter < 0.3) || (!isCustomWeight && counter < 2))}
            height={height}
          >
            <MinusCircle />
          </MinusButton>
        )}
      <Counter
        fontSize={fontSize}
      >
        {withSuffix ? numberFormat(counter, measurement) : numberFormat(counter)}
      </Counter>
      <PlusButton
        onClick={handleAdd}
        height={height}
      >
        <PlusCircle />
      </PlusButton>
    </StyledCartButton>
  )
}

CartButton.propTypes = {
  amount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onChange: PropTypes.func,
  withDelete: PropTypes.bool,
  withSuffix: PropTypes.bool,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  minWidth: PropTypes.string,
  height: PropTypes.string,
  measurement: PropTypes.string,
  onDelete: PropTypes.func
}

export default CartButton
