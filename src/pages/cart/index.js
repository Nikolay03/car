import React from 'react'

import Layout from '~/layout/Layout'
import Container from '~/components/elements/Container'
import CartContainer from '~/view/Cart/CartContainer'
import { fetchData } from '~/utils/fetch'
import * as API from '~/constants/api'
import OrderProvider from '~/components/order/OrderProvider'

const CartDetail = (props) => {
  return (
    <OrderProvider {...props}>
      <Layout underLine={true}>
        <Container>
          <CartContainer />
        </Container>
      </Layout>
    </OrderProvider>
  )
}

export async function getServerSideProps (ctx) {
  const deliveryTypes = await fetchData(API.DELIVERY_TYPE_LIST, {
    page_size: 10
  })

  return {
    props: {
      deliveryTypes
    }
  }
}

export default CartDetail
