import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: ${({ theme, color }) => color === 'dark' ? theme.color.primary : theme.palette.white};
  font-size: 28px;
  font-weight: 600;
  line-height: 1.22;
`

const PageTitle = ({ children }) => {
  return (
    <Title color={'dark'} style={{ margin: '1.5em 0px' }}>
      {children}
    </Title>
  )
}

export default PageTitle
