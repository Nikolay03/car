import React from 'react'
import styled from 'styled-components'

const TitleFlex = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.67;
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
const SubTitle = styled.div`
  color: #818591;
  margin: 3px 0 20px 0;
  font-size: 14px;
  line-height: 20px;
`

const BorderBlock = ({ name, info, ...props }) => {
  return (
    <Block {...props}>
      <TitleFlex>
        <Title>{name}</Title>
      </TitleFlex>
      {info && (
        <SubTitle>
          {info}
        </SubTitle>
      )}
    </Block>
  )
}

export default BorderBlock
