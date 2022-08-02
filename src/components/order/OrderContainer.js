
import React from 'react'
import { prop } from 'ramda'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'

import Order from './Order'

import * as ROUTE from '~/constants/routes'
import { useCartData } from '~/providers/CartProvider'
import { removeStorage } from '~/utils/localStorage'
import { cartClear } from '~/components/cart/storage'
import { useAuth } from '~/providers/AuthProvider'
import { useOrderData } from '~/components/order/OrderProvider'
import { getListData } from '~/utils/fetch'
import useCreate from '~/hooks/crud/useCreate'
import { LOGIN, ORDER_CREATE } from '~/constants/api'
import { orderCreateSerializer } from '~/components/order/orderSerializer'
import { mapResponseToFormError } from '~/utils/form'

const OrderContainer = () => {
  const [products, dispatch] = useCartData()
  // Data
  const { user } = useAuth()
  const { deliveryTypes } = useOrderData()
  const { addToast } = useToasts()

  // Const
  const router = useRouter()
  const username = prop('username', user)
  const {
    results: deliveryTypesResults
  } = getListData(deliveryTypes)

  // MainSubmit
  const orderCreate = useCreate(ORDER_CREATE)
  const onSubmit = values => {
    orderCreate.create(orderCreateSerializer({ products, ...values }))
      .then(({ value }) => {
        addToast('Заказ успешно создан', { appearance: 'success' })
        return router.replace({ pathname: ROUTE.HOME }, null, { shallow: true })
      })
      .then(() => removeStorage('cart'))
      .then(() => cartClear(dispatch))
      .catch(error => {
        return mapResponseToFormError(error)
      })
  }

  // InitialValues
  const initialValues = {
    clientPhone: username
  }

  // Render
  return (
    <Order
      deliveryTypesResults={deliveryTypesResults}
      onSubmit={onSubmit}
      orderCreate={orderCreate}
      initialValues={initialValues}
    />
  )
}

export default OrderContainer
