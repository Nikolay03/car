import React from 'react'
import Link from 'next/link'
import { isEmpty } from 'ramda'
import styled from 'styled-components'

import Basket from '~/icons/Basket'
import { useCartData } from '~/providers/CartProvider'

const CartCount = styled('span')`
  position: absolute;
  left: 16px;
  top: 3px;
  width: 8px;
  height: 8px;
  font-weight: 600;
  font-size: 11px;
  padding: 2px;
  line-height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #DF2626;
  border: 1px solid white;
  border-radius: 30px;
`

const Relative = styled.div`
  display: flex;
  position: relative;
  & svg {
    font-size:24px;
  }
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
            {/* {products.length} */}
          </CartCount>
        )}
      </Relative>
    </Link>
  )
}

BasketUi.propTypes = {

}

export default BasketUi
