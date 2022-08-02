import React from 'react'
import styled, { withTheme } from 'styled-components'

import Loader from '~/components/PreLoader/Loader'

const typeSizes = (size, theme) => {
  switch (size) {
    default:
      return {
        padding: '9px 30px',
        lineHeight: '19px',
        fontWeight: 700,
        fontSize: '15px'
      }
  }
}

const typeStyles = (themeType, theme) => {
  switch (themeType) {
    case 'lighten':
      return {
        color: theme.color.primary,
        borderRadius: '38px',
        background: 'white'
      }
    case 'dark':
      return {
        color: '#fff',
        background: theme.background.button,
        borderRadius: '38px',
        padding: '15px 30px',
        border: `1px solid ${theme.color.primary}`
      }
    default:
      return {
        color: theme.color.button,
        background: theme.background.button
      }
  }
}
// Styles
const Wrap = styled('button')`
  width: ${({ width, fullWidth }) => width || (fullWidth && '100%')};
  min-width: ${({ loading }) => loading && '140px'};
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.primary};
  line-height: 17px;
  transition: ${({ theme }) => `all ${theme.transition.medium}`};
  &:active {
    opacity: 0.8;
    transition: ${({ theme }) => `all ${theme.transition.medium}`};
  }
  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.background.buttonDisabled};
    color: ${({ theme }) => theme.color.secondary};
    border-color: transparent;
    transition: ${({ theme }) => `all ${theme.transition.medium}`};
  }
  ${({ styles }) => styles};
  ${({ size, theme }) => typeSizes(size, theme)}
  ${({ themeType, theme }) => typeStyles(themeType, theme)}
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    margin-left: 10px;
  }
`
// Component
const Button = props => {
  const {
    width, size, fullWidth, type = 'submit', themeType, disabled = false, onClick, loading, children, styles
  } = props

  // TypeStyles
  // Render
  return (
    <Wrap
      type={type}
      loading={loading}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      width={width}
      onClick={(!loading && onClick) || (() => '')}
      styles={styles}
      themeType={themeType}
    >
      {loading ? (<Loading><Loader size={0.5} /> <span>загрузка</span></Loading>) : children}
    </Wrap>
  )
}

Button.defaultProps = {
  size: 'small'
}

export default withTheme(Button)
