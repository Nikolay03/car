import React from 'react'
import styled from 'styled-components'
import { ChevronRight } from 'react-feather'

const Flex = styled.button`
  display: grid;
  grid-gap: 12px;
  align-items: center;
  grid: 1fr / 1fr min-content;
  * {
    font-size: 15px;
  }
`

const MoreButton = ({ children, ...otherProps }) => {
  return (
    <Flex {...otherProps}>
      <span>{children}</span>
      <ChevronRight size={15} />
    </Flex>
  )
}

export default MoreButton
