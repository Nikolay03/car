import React from 'react'
import PropTypes from 'prop-types'

import { DataProvider } from '~/providers/DataContext'

function AppProviders (props) {
  const { children, categoryData } = props

  return (
    <DataProvider categoryData={categoryData}>
      {children}
    </DataProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppProviders
