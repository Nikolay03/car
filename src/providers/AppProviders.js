import React from 'react'
import PropTypes from 'prop-types'
import { ToastProvider } from 'react-toast-notifications'

import { DataProvider } from '~/providers/DataProvider'
import { CartProvider } from '~/providers/CartProvider'
import { AuthProvider } from '~/providers/AuthProvider'

function AppProviders (props) {
  const { children, categoryData } = props

  return (
    <DataProvider categoryData={categoryData}>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </DataProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppProviders
