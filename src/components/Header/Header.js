import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import { Heart } from 'react-feather'

import DesktopMenu from '~/components/Header/DesktopMenu'
import Container from '~/components/elements/Container'
import Logo from '~/icons/Logo'
import * as ROUTES from '~/constants/routes'
import Languages from '~/components/Header/Languages'
import Basket from '~/icons/Basket'

const StyledHeader = styled.header`
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: white;
  transition: box-shadow 300ms ease;
`
const StyledContainer = styled(Container)`
  display: flex;
  height: 80px;
  padding: 0px 15px;
  justify-content: space-between;
  align-items: center;
`

const LogoContainer = styled.div`
  cursor: pointer;
`

const RighrSide = styled.div`
  display: grid;
  grid-gap: 25px;
  grid: 1fr / repeat(4, auto);
  align-items: center;
  & svg {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`

const LeftSide = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 40px;
  grid: 1fr / repeat(2, auto);
`

const Header = props => {
  const headerRef = useRef()
  useEffect(() => {
    const onScroll = () => {
      window.pageYOffset > 0
        ? headerRef.current.classList.add('activeHeader')
        : headerRef.current.classList.remove('activeHeader')
    }
    // clean up code
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <StyledHeader ref={headerRef}>
      <StyledContainer>
        <LeftSide>
          <NextLink href={ROUTES.HOME}>
            <LogoContainer>
              <Logo height={51} width={129} />
            </LogoContainer>
          </NextLink>
          <DesktopMenu />
        </LeftSide>
        <RighrSide>
          <a href={'tel:+1-847-555-5555'}>(97) 733-30-06</a>
          <Languages />
          <Heart />
          <Basket color={'transparent'} />
        </RighrSide>
      </StyledContainer>
    </StyledHeader>
  )
}

export default Header
