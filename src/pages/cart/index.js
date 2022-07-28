import React from 'react'

import Layout from '~/layout/Layout'
import Container from '~/components/elements/Container'
import CartContainer from '~/view/Cart/CartContainer'

const CategoryDetail = () => {
  return (
    <Layout underLine={true}>
      <Container>
        <CartContainer />
      </Container>
    </Layout>
  )
}

export default CategoryDetail
