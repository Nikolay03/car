import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import numberFormat from '~/utils/numberFormat'

const CartInfoBlock = styled.div`
  position: sticky;
  top: 130px;
  background: #fff;
  padding: 25px 20px 20px;
  border-radius: 5px;
  width: 290px;
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
  margin-bottom: 0;
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

const OrderInfo = props => {
  const {
    totalPrice,
    productAmount
  } = props

  return (
    <CartInfoBlock>
      <PriceBlock>
        <PriceBlockItem>
          <div>Товары ({productAmount})</div>
          <div>{numberFormat(totalPrice, 'сум')}</div>
        </PriceBlockItem>
        <Line />
        <PriceTotalBlock>
          <h6>Итого</h6>
          <div>{numberFormat((+totalPrice) || 0, 'сум')}</div>
        </PriceTotalBlock>
      </PriceBlock>
    </CartInfoBlock>
  )
}

OrderInfo.propTypes = {
  totalPrice: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number
  ]),
  productAmount: PropTypes.number,
  deliveryPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default OrderInfo
