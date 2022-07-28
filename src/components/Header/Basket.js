import React from 'react'
import Link from 'next/link'
import { isEmpty } from 'ramda'
import styled from 'styled-components'

import Basket from '~/icons/Basket'
import { useCartData } from '~/providers/CartProvider'

const CartCount = styled('span')`
  position: absolute;
  left: 15px;
  top: -5px;
  min-width: 20px;
  min-height: 20px;
  font-weight: 600;
  font-size: 11px;
  padding: 2px;
  line-height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 2px solid #6a82c2;
  color: ${({ theme }) => theme.palette.primary};
  border-radius: 30px;
`

const Relative = styled.div`
  position: relative;
`

const BasketUi = props => {
  const [products] = useCartData()

  const noProducts = isEmpty(products)

  return (
    <Link
      href={'/cart'}
    >
      <Relative>
        <Basket color={'transparent'} />
        {!noProducts && (
          <CartCount>
            {products.length}
          </CartCount>
        )}
      </Relative>
    </Link>
  )
}

BasketUi.propTypes = {

}

export default BasketUi
