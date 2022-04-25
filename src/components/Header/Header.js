import React from 'react'
import styled from 'styled-components'

import DesktopMenu from '~/components/Header/DesktopMenu'
import Container from '~/components/elements/Container'

const StyledHeader = styled.header`
  z-index: 1;
  border-bottom: 1px solid #e3e3e3;
  box-shadow: 0px 2px 10px rgba(224, 224, 224, 0.57);
`
const StyledContainer = styled(Container)`
  display: flex;
  height: 80px;
  padding: 0px 15px;
  justify-content: space-between;
  align-items: center;
`

const Header = props => {
  return (
    <StyledHeader>
      <StyledContainer>
        <a href={''}>Logo</a>
        <DesktopMenu />
        <div>
          Actions
        </div>
      </StyledContainer>
    </StyledHeader>
  )
}

export default Header
