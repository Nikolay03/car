import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const OrderContext = createContext(null)

function OrderProvider (props) {
  const { children, ...restProps } = props

  return (
    <OrderContext.Provider value={restProps}>
      {children}
    </OrderContext.Provider>
  )
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useOrderData () {
  return useContext(OrderContext)
}

export default OrderProvider
