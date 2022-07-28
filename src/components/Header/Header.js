import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

import DesktopMenu from '~/components/Header/DesktopMenu'
import Container from '~/components/elements/Container'
import Logo from '~/icons/Logo'
import * as ROUTES from '~/constants/routes'
import MobileMenu from '~/components/Header/MobileMenu'

const StyledHeader = styled.header`
  z-index: 2;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: white;
  transition: box-shadow 300ms ease;
  border-bottom: ${({ underLine }) => underLine && '1px solid #e3e3e3'};
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

const LeftSide = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 40px;
  grid: 1fr / repeat(2, auto);
`

const Header = ({ underLine }) => {
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
    <StyledHeader ref={headerRef} underLine={underLine}>
      <StyledContainer>
        <LeftSide>
          <NextLink href={ROUTES.HOME}>
            <LogoContainer>
              <Logo height={51} width={129} />
            </LogoContainer>
          </NextLink>
        </LeftSide>
        <DesktopMenu />
        <MobileMenu />
      </StyledContainer>
    </StyledHeader>
  )
}

export default Header
