import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  grid-gap: 15px;
  display: grid;
  flex-wrap: wrap;
  grid: 1fr / ${({ length }) => `repeat(${length}, 1fr)`}
`
const Block = styled.div`
  background: #fff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme, isActive }) => isActive ? theme.palette.primary : '#dbdbdd'};
  border-radius: 7px;
  cursor: pointer;
  padding: 10px 20px;
  min-height: 60px;
  vertical-align: top;
`
const TitleFlex = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.67;
`
const SubTitle = styled.div`
  color: #818591;
  margin: 3px 0 20px 0;
  font-size: 14px;
  line-height: 20px;
`

const EMPTY_OBJ = {}

const OrderSelectField = props => {
  const {
    input,
    dataProps
  } = props
  const onChange = value => input.onChange(value)
  return (
    <Wrapper length={dataProps.length}>
      {dataProps.map(item => {
        const isActive = input.value && input.value.id === item.id
        const toggleItem = isActive ? EMPTY_OBJ : item
        return (
          <Block
            isActive={isActive}
            key={item.id}
            onClick={() => onChange(toggleItem)}
          >
            <TitleFlex>
              <Title>{item.name}</Title>
            </TitleFlex>
            {item.info && (
              <SubTitle>
                {item.info}
              </SubTitle>
            )}
          </Block>
        )
      })}
    </Wrapper>
  )
}

OrderSelectField.propTypes = {
  input: PropTypes.object,
  data: PropTypes.any
}

export default OrderSelectField
