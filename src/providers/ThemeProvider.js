import React from 'react'
import { ThemeProvider as Provider } from 'styled-components'

import NormalizeCSS from '~/themes/NormalizeCSS'
import MainCSS from '~/themes/MainCSS'
import useWindowSize from '~/hooks/useWindowResize'
import theme from '~/constants/themes'

const ThemeProvider = ({ children }) => {
  const breakpoints = useWindowSize()

  return (
    <Provider theme={theme(breakpoints)}>
      <NormalizeCSS />
      <MainCSS />
      {children}
    </Provider>
  )
}

export default ThemeProvider
