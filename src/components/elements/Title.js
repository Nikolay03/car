import React from 'react'
import styled from 'styled-components'

const styles = ({ theme, size }) => {
  switch (size) {
    case 'h1': return { fontSize: theme.fontSize.large, fontWeight: 600, letterSpacing: '-2.3px' }
    case 'h2': return { fontSize: theme.fontSize.big, fontWeight: 600 }
    case 'h3': return { fontSize: theme.fontSize.capital }
    case 'h4': return { fontSize: theme.fontSize.medium }
    default: return { fontSize: theme.fontSize.capital }
  }
}
const TitleStyled = styled.h1`
  color: ${({ theme, color }) => color === 'dark' ? theme.color.primary : theme.palette.secondary};
  line-height: 1.22;
  ${(props) => styles(props)}
`

const Title = ({ as, children, ...props }) => {
  return (
    <TitleStyled
      size={as}
      as={as}
      {...props}
    >
      {children}
    </TitleStyled>
  )
}

Title.defaultProps = {
  color: 'dark'
}

export default Title
