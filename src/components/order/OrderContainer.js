
import React from 'react'
import { sprintf } from 'sprintf-js'
import { prop } from 'ramda'
import { useRouter } from 'next/router'

import { orderCreateAction } from './actions'
import Order from './Order'

import * as ROUTE from '~/constants/routes'
import { useCartData } from '~/providers/CartProvider'
import { useAppData } from '~/providers/DataProvider'
import { removeStorage } from '~/utils/localStorage'
import { cartClear } from '~/components/cart/storage'

const OrderContainer = () => {
  const [products, dispatch] = useCartData()

  // Data
  const { userInfoData } = useAppData()

  // Const
  const router = useRouter()
  const userFullName = prop('fullName', userInfoData)
  const userUsername = prop('username', userInfoData)

  // MainSubmit
  const onSubmit = values => {
    orderCreateAction(values, products)
      .then(({ value }) =>
        router.replace({ pathname: sprintf(ROUTE.HOME, value.id) }, null, { shallow: true })
      )
      .then(() => removeStorage('cart'))
      .then(() => cartClear(dispatch))
  }

  // InitialValues
  const initialValues = {
    mainPhone: +`${parseInt(userUsername)}`.slice(3) || 999999999,
    mainFullname: userFullName
  }

  // Render
  return (
    <Order
      onSubmit={onSubmit}
      initialValues={initialValues}
    />
  )
}

export default OrderContainer
