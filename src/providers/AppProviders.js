import React from 'react'
import PropTypes from 'prop-types'

import { DataProvider } from '~/providers/DataProvider'
import { CartProvider } from '~/providers/CartProvider'
import { AuthProvider } from '~/providers/AuthProvider'

function AppProviders (props) {
  const { children, categoryData, userInfoData } = props

  return (
    <DataProvider categoryData={categoryData} userInfoData={userInfoData}>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </DataProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppProviders
