import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getCartItems } from '~/utils/storage'

const CartContext = createContext(null)

export function CartProvider (props) {
  const { children } = props
  const [cartList, dispatch] = useState([])
  useEffect(() => {
    dispatch(getCartItems())
  }, [])
  return (
    <CartContext.Provider value={[cartList, dispatch]}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useCartData () {
  return useContext(CartContext)
}
