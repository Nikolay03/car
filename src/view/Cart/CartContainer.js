import React from 'react'
import { isEmpty } from 'ramda'

import CartGrid from './CartGrid'

import { useCartData } from '~/providers/CartProvider'
import { removeItemFrom } from '~/components/cart/storage'

const CartContainer = () => {
  const [products, dispatch] = useCartData()

  const onDelete = (id) => {
    return removeItemFrom(id, dispatch)
  }

  const productsArr = !products || isEmpty(products) ? [] : products

  // const token = useSelector(getDataFromState('login'), equals)
  const token = ''

  return (
    <CartGrid
      products={productsArr}
      onDelete={onDelete}
      token={token}
    />
  )
}

export default CartContainer
