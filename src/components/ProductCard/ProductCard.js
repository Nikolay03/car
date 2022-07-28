import React from 'react'
import styled from 'styled-components'
import { find, path, prop, propEq } from 'ramda'

import Image from '~/components/Images/Image'
import { useTranslate } from '~/utils/translate'
import CartButton from '~/components/elements/Buttons/CartButton'
import Button from '~/components/elements/Buttons/Button'
import { removeItemFrom, setItemToCart } from '~/components/cart/storage'
import { useCartData } from '~/providers/CartProvider'

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

  const [products, dispatch] = useCartData()
  const title = translateData(data, 'name')
  const description = translateData(data, 'shortDescription')

  const id = prop('id', data)
  const cartProduct = find(propEq('id', id))(products)
  const idChecker = path(['id'], cartProduct)
  const amount = prop('amount', cartProduct)

  const mathValue = 1

  const handleAddFirst = product => setItemToCart(mathValue, product, dispatch)
  const handleAdd = (product, value) => {
    return setItemToCart((+value + mathValue).toFixed(1), product, dispatch)
  }
  const handleRemove = (product, value) => {
    return setItemToCart((+value - mathValue).toFixed(1), product, dispatch)
  }

  const onDelete = () => {
    return removeItemFrom(id, dispatch)
  }

  const price = data?.price
  return (
    <ItemWrapper>
      <Item>
        <ImageCont>
          <Image
            objectFit={'contain'}
            src={'/assets/armchair.png'}
            alt={'banner'}
            style={{ height: '300px', width: '100%', userSelect: 'none' }}
          />
        </ImageCont>
        <SubTitle>{title} {!priceBottom && (<span>{price} сум</span>)}</SubTitle>
        <Description>{description}</Description>
        {priceBottom && <SubTitle>{price} сум</SubTitle>}
        <ButtonPosition>
          {id === idChecker
            ? (
              <CartButton
                amount={amount}
                onAdd={() => handleAdd(data, amount)}
                onRemove={() => handleRemove(data, amount)}
                onDelete={onDelete}
                withDelete={true}
                withSuffix={true}
              />
            )
            : (
              <Button
                onClick={() => handleAddFirst(data)}
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
