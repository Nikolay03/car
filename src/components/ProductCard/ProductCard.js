import React from 'react'
import styled from 'styled-components'
import { sprintf } from 'sprintf-js'
import { find, path, prop, propEq } from 'ramda'
import Link from 'next/link'

import * as ROUTES from '~/constants/routes'
import Image from '~/components/Images/Image'
import { useTranslate } from '~/utils/translate'
import CartButton from '~/components/elements/Buttons/CartButton'
import Button from '~/components/elements/Buttons/Button'
import { useCartData } from '~/providers/CartProvider'
import numberFormat from '~/utils/numberFormat'
import useCartActions from '~/hooks/useCartActions'

const ItemWrapper = styled('div')`
  padding: 0px 11px;
`

const Item = styled('div')`
  position: relative;
  cursor: pointer;
`

const ImageCont = styled.div`
  padding: 30px 0px 30px 0px;
  background-color: ${({ theme }) => theme.table.backgroundColor};
`

const SubTitle = styled('p')`
  margin-top: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`

const Description = styled('p')`
  margin-top: 5px;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.color.secondary};
`

const ButtonPosition = styled.div`
  //width: calc(100% - 36px);
  width: 100%;
  margin: 18px 0px 0px;
  & > button {
    font-weight: 600;
    height: 46px;
  }
  & > div {
    margin-top: 0;
  }
`

const ProductCard = ({ data, priceBottom }) => {
  const { translateData } = useTranslate()
  const id = prop('id', data)

  const [products] = useCartData()
  const title = translateData(data, 'name')
  const description = translateData(data, 'shortDescription')

  const cartProduct = find(propEq('id', id))(products)
  const idChecker = path(['id'], cartProduct)
  const amount = prop('amount', cartProduct)

  const {
    onAddProductFirst,
    onRemoveProduct,
    onIncrementProduct,
    onDecrementProduct
  } = useCartActions()

  const price = data?.price
  return (
    <ItemWrapper>
      <Item>
        <Link href={sprintf(ROUTES.PRODUCTS_ITEM_URL, id)}>
          <div>
            <ImageCont>
              <Image
                objectFit={'contain'}
                src={'/assets/armchair.png'}
                alt={'banner'}
                style={{ height: '300px', width: '100%', userSelect: 'none' }}
              />
            </ImageCont>
            <SubTitle>{title} {!priceBottom && (<span>{numberFormat(price)} сум</span>)}</SubTitle>
            <Description>{description}</Description>
            {priceBottom && <SubTitle>{price} сум</SubTitle>}
          </div>
        </Link>
        <ButtonPosition>
          {id === idChecker
            ? (
              <CartButton
                amount={amount}
                onAdd={() => onIncrementProduct(data, amount)}
                onRemove={() => onDecrementProduct(data, amount)}
                onDelete={onRemoveProduct}
                withDelete={true}
                withSuffix={true}
              />
            )
            : (
              <Button
                onClick={() => onAddProductFirst(data)}
                fullWidth={true}
              >
              В корзину
              </Button>
            )}
        </ButtonPosition>
      </Item>
    </ItemWrapper>
  )
}

export default ProductCard
