import styled from 'styled-components'
import React from 'react'

const Svg = styled.svg`
  transition: fill 300ms;
`

const SvgIcon = ({
  children,
  fontSize = '20px',
  viewBox = '0 0 24 24',
  height = '1em',
  width = '1em',
  xmlns = 'http://www.w3.org/2000/svg',
  fill,
  ...props
}) => {
  return (
    <Svg
      fill={fill || 'currentColor'}
      fontSize={fontSize} viewBox={viewBox} height={height} width={width} xmlns={xmlns} {...props}>
      {children}
    </Svg>
  )
}

export default SvgIcon
