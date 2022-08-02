import React from 'react'
import NextLink from 'next/link'
import styled from 'styled-components'

import * as ROUTES from '~/constants/routes'
import { mediaQueries } from '~/constants/mediaQueries'
import LogoIcon from '~/icons/Logo'

const LogoContainer = styled.div`
  cursor: pointer;
  & svg {
    height: 51px;
    width: 129px;
  }
  @media ${mediaQueries.tabletS} {
    & svg {
      height: auto;
      width: 100px;
    }
  }
`

const Logo = props => {
  return (
    <>
      <NextLink href={ROUTES.HOME}>
        <LogoContainer>
          <LogoIcon />
        </LogoContainer>
      </NextLink>
    </>
  )
}

Logo.propTypes = {

}

export default Logo
