import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { pathOr, takeLast } from 'ramda'

import Container from '~/components/elements/Container'
import { CartInfo } from '~/components/cart'
import OrderContainer from '~/components/order/OrderContainer'
import SignInForm from '~/view/sign-in/SignInForm'
import { useAuth } from '~/providers/AuthProvider'

const Wrap = styled(Container)`
  padding: 35px 15px;
`
const Title = styled('h3')`
  font-weight: 700;
  font-size: 30px;
  line-height: 119.46%;
  color: #2e384c;
  margin: 0 0 35px;
`

const Row = styled.div``
const Col = styled.div``

const SimpleGrid = styled.div`
  display: grid;
  grid-gap: 50px;
  grid: 1fr / 1fr min-content;
`

const CartGrid = props => {
  const {
    onDelete,
    products,
    token
  } = props

  const productAmount = products.length
  let sumall = 0
  let summ = 0

  const totalPr = products.map((product) => {
    const productPrice = Number(pathOr(0, ['price'], product))
    const amount = pathOr(0, ['amount'], product)
    const totalProdPrice = productPrice * amount
    sumall += totalProdPrice
    return sumall
  })

  const totalAm = products.map((product) => {
    const productPrice = Number(pathOr(0, ['price'], product))
    summ += productPrice
    return summ
  })

  const totalAmount = takeLast(1, totalAm)
  const totalPrice = takeLast(1, totalPr)

  const { isAuth } = useAuth()

  return (
    <Wrap>
      <Row>
        <Title>Корзина</Title>
      </Row>
      <SimpleGrid gutter={24}>
        <Col span={18}>
          {isAuth
            ? (
              <OrderContainer />
            )
            : (
              <SignInForm />
            )}
        </Col>
        <Col span={6}>
          <CartInfo
            totalPrice={totalPrice}
            totalAmount={totalAmount}
            productAmount={productAmount}
            products={products}
            token={token}
            onDelete={onDelete}
          />
        </Col>
      </SimpleGrid>
    </Wrap>
  )
}

CartGrid.propTypes = {
  products: PropTypes.array,
  token: PropTypes.object,
  onDelete: PropTypes.func
}

CartGrid.defaultProps = {
  products: []
}
export default CartGrid
