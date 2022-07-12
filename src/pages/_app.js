/* eslint-disable react/react-in-jsx-scope */
import App from 'next/app'
import Router from 'next/router'
import { SWRConfig } from 'swr'
import '@fontsource/source-sans-pro/300.css'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import 'react-multi-carousel/lib/styles.css'
import ProgressBar from '@badrap/bar-of-progress'
import PropTypes from 'prop-types'
import axios from 'axios'
import { propOr } from 'ramda'

import { fetcher } from '~/utils/swr'
import ThemeProvider from '~/providers/ThemeProvider'
import AppProviders from '~/providers/AppProviders'
import { CATEGORY_CATEGORY_LIST } from '~/constants/api'
import toCamelCase from '~/utils/toCamelCase'

const progress = new ProgressBar({
  size: 2,
  className: 'bar-of-progress',
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp (props) {
  const { Component, pageProps } = props
  const categoryData = propOr({}, 'categoryData', props)
  return (
    <AppProviders categoryData={categoryData}>
      <SWRConfig value={{ fetcher }}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </AppProviders>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const categoryData = await axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).get(CATEGORY_CATEGORY_LIST)
  return { ...appProps, categoryData: categoryData?.data && toCamelCase(categoryData?.data) }
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]).isRequired,
  pageProps: PropTypes.object.isRequired
}

export default MyApp
