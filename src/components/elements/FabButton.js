import React from 'react'
import styled from 'styled-components'

const Fab = styled('a')`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  width: 45px;
  height: 45px;
  padding: 0;
  font-size: 0.875rem;
  min-width: 0;
  box-sizing: border-box;
  min-height: 36px;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 50%;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  z-index: 1;
  bottom: 20px;
  right: 20px;
  background: #fff;
  & svg {
    fill: #fff;
  }
`
const FabButton = ({ children, ...props }) => {
  return (
    <Fab {...props}>
      {children}
    </Fab>
  )
}

export default FabButton
