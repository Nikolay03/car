/* eslint-disable react/react-in-jsx-scope */
import Router from 'next/router'
import { SWRConfig } from 'swr'
import '@fontsource/source-sans-pro/300.css'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import 'react-multi-carousel/lib/styles.css'
import ProgressBar from '@badrap/bar-of-progress'
import PropTypes from 'prop-types'

import { fetcher } from '~/utils/swr'
import ThemeProvider from '~/providers/ThemeProvider'

const progress = new ProgressBar({
  size: 2,
  className: 'bar-of-progress',
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function App (props) {
  const { Component, pageProps } = props

  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}

App.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]).isRequired,
  pageProps: PropTypes.object.isRequired
}

export default App
