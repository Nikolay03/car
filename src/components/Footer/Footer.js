import React from 'react'
import styled from 'styled-components'

import SocialItems from '~/components/Header/SocialItems'
import Logo from '~/components/Header/Logo'
import Container from '~/components/elements/Container'
import { mediaQueries } from '~/constants/mediaQueries'

const StyledCont = styled(Container)`
  margin-top: 75px;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const FirstBlock = styled(Flex)`
  padding-bottom: 30px;
  border-bottom: 1px solid #E6E6E6;
  @media ${mediaQueries.tabletS} {
    padding-bottom: 5px;
  }
`

const SecondBlock = styled(Flex)`
  padding: 30px 0px;
  color: ${({ theme }) => theme.color.secondary};
`

const Socials = styled.div`
  display: grid;
  grid-gap: 30px;
  align-items: center;
  grid: 1fr / repeat(2, min-content);
  & svg {
    fill: ${({ theme }) => theme.color.primary};
  }
`

const Oferta = styled.div`
  display: grid;
  grid-gap: 44px;
  grid-template-columns: min-content min-content;
  white-space: nowrap;
`

const Footer = props => {
  return (
    <StyledCont>
      <FirstBlock>
        <Logo />
        <Socials>
          <SocialItems size={'22'} bg={true} />
        </Socials>
      </FirstBlock>
      <SecondBlock>
        <Oferta>
          <span>© 2022 «CheholUz»</span>
          <span>Оферта</span>
        </Oferta>
      </SecondBlock>
    </StyledCont>
  )
}

export default Footer
