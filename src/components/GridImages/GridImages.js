
import styled, { css } from 'styled-components'
import React, { useState } from 'react'

import { mediaQueries } from '~/constants/mediaQueries'

const Grid = styled('div')`
  display: grid;
  height: 350px;
  grid-gap: 10px;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: ${({ length }) => {
    if (length >= 6) return 'repeat(3, auto)'
    else if (length < 6) return 'repeat(2, auto)'
  }};
`

const Item = styled('div')`
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: ${({ url }) => `url(${url})`} no-repeat center;
  background-size: cover;
  height: ${({ position, length, isAvatar }) => {
    if (isAvatar) return '115px'
    else if (length > 1 && length <= 3 && position === 0) return '100%'
    return '100%'
  }};
  width: ${({ isAvatar }) => isAvatar && '115px'};
  border-radius: ${({ isAvatar }) => isAvatar && '100%'};
  max-height: ${({ position, length, isAvatar }) => {
    const height = 530
    if (isAvatar) return '115px'
    else if (length > 1 && length <= 3 && position === 0) return '100%'
    else if (position === 0) return height + 'px'
    else if (position > 0 && position < 3) return height / 2 + 'px'
    return height / 2.5 + 'px'
  }};
  grid-column-start: ${({ position }) => {
    if (position === 0) return '1'
  }};
  grid-column-end: ${({ position }) => {
    if (position === 0) return '3'
  }};
  grid-row: ${({ length, position }) => {
    if (length > 2 && position === 0) return '1 / 3'
  }};
  & p {
    font-size: ${({ theme }) => theme.fontSize.big};
    font-weight: 500;
    text-align: center;
    color: ${({ theme }) => theme.color.white};
  }
  @media ${mediaQueries.tabletL} {
    max-height: ${({ position, length }) => {
    const height = 360
    if (length > 1 && length <= 3 && position === 0) return '100%'
    if (position === 0) return height + 'px'
    else if (position > 0 && position < 3) return height / 2 + 'px'
    return height / 2.5 + 'px'
  }};
  }
  
  @media ${mediaQueries.tabletS} {
    max-height: ${({ position, length }) => {
    const height = 250
    if (length > 1 && length <= 3 && position === 0) return '100%'
    if (position === 0) return height + 'px'
    else if (position > 0 && position < 3) return height / 3 + 'px'
    return height / 2.5 + 'px'
  }};
  }
`

const GridImages = ({ images, isAvatar }) => {
  const length = images.length
  return (
    <>
      <Grid length={length}>
        {images.map((item, key) => {
          const url = item.url
          if (length <= 5 && key <= 2) {
            return <Item isAvatar={isAvatar} url={url} key={key} position={key} length={length} />
          }
          else if (length >= 6 && key <= 6) {
            return <Item isAvatar={isAvatar} url={url} key={key} position={key} length={length} />
          }
        })}
      </Grid>
    </>
  )
}

export default GridImages
