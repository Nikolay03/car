import React from 'react'
import styled, { css } from 'styled-components'

import Telegram from '~/icons/socials/Telegram'
import Instagram from '~/icons/socials/Instagram'

const Link = styled.a`
  display: flex;
  align-items: center;
  & svg {
    width: ${({ size }) => size ? `${size}px` : '20px'};
    height: ${({ size }) => size ? `${size}px` : '20px'};
  }
  ${({ bg }) => bg && css`
    border-radius: 100%;
    background: ${({ theme }) => theme.background.secondary};
  `}
`

const Grid = styled.div`
  display: grid;
  align-self: center;
  justify-content: center;
  grid-gap: 10px;
  padding: ${props => props.withText ? '0px' : '9px'} ;
  grid: ${props => props.withText ? '1fr / min-content 1fr' : '1fr'};
`
const SocialItems = (props) => {
  return (
    <>
      <Link href={'https://t.me/1'} {...props}>
        <Grid withText={props.withText}>
          <Telegram />
          {props.withText && <span>
            Telegram
          </span>}
        </Grid>
      </Link>
      <Link href={'https://www.instagram.com/chehol.uz/'} {...props}>
        <Grid withText={props.withText}>
          <Instagram />
          {props.withText && <span>
            Instagram
          </span>}
        </Grid>
      </Link>
    </>
  )
}

export default SocialItems
