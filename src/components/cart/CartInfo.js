import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import numberFormat from '~/utils/numberFormat'
import { CartUI } from '~/components/cart/index'

const CartInfoBlock = styled.div`
  background: #fff;
  padding: 25px 20px 20px;
  border-radius: 5px;
  width: 360px;
`
const PriceBlock = styled.div``
const PriceBlockItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #2e384c;
`
const PriceTotalBlock = styled(PriceBlockItem)`
  line-height: 164.57%;
  color: #2e384c;
  h6{
    font-size: 15px;
    font-weight: 600;
  }
  div{
    font-weight: 700;
    font-size: 16px;
  }
`
const Line = styled.div`
  border-bottom: 1px solid #eaeaec;
  margin-bottom: 15px;
  margin-top: 15px;
`

const CartInfo = props => {
  const {
    onDelete,
    totalPrice,
    productAmount,
    deliveryPrice = 0,
    products
  } = props

  // Render
  return (
    <CartInfoBlock>
      <PriceBlock>
        <PriceBlockItem>
          <div>Товары ({productAmount})</div>
          <div>{numberFormat(totalPrice, 'сум')}</div>
        </PriceBlockItem>
        {deliveryPrice !== 0 &&
        <PriceBlockItem>
          <div>Доставка</div>
          <div>{numberFormat(deliveryPrice, 'сум')}</div>
        </PriceBlockItem>}
        <PriceTotalBlock>
          <h6>Итого</h6>
          <div>{numberFormat((+totalPrice + deliveryPrice) || 0, 'сум')}</div>
        </PriceTotalBlock>
        <Line />
        <CartUI
          products={products}
          onDelete={onDelete}
        />
      </PriceBlock>
    </CartInfoBlock>
  )
}

CartInfo.propTypes = {
  totalPrice: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number
  ]),
  productAmount: PropTypes.number,
  deliveryPrice: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

export default CartInfo
