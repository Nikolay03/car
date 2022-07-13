import React from 'react'
import styled from 'styled-components'

const styles = ({ theme, size }) => {
  switch (size) {
    case 'h1': return { fontSize: theme.fontSize.large, fontWeight: 700, letterSpacing: '-2.3px' }
    case 'h2': return { fontSize: theme.fontSize.big, fontWeight: 600 }
    case 'h3': return { fontSize: theme.fontSize.capital }
    case 'h4': return { fontSize: theme.fontSize.medium }
    default: return { fontSize: theme.fontSize.capitalBig, color: theme.color.primaryGray, fontWeight: 600 }
  }
}
const TitleStyled = styled.h3`
  color: ${({ theme, color }) => color === 'dark' ? theme.color.primary : theme.palette.white};
  line-height: 1.22;
  ${(props) => styles(props)}
`

const Title = ({ as, size, children, ...props }) => {
  return (
    <TitleStyled
      size={size || as}
      as={as}
      {...props}
    >
      {children}
    </TitleStyled>
  )
}

Title.defaultProps = {
}

export default Title
