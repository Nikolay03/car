import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { path, isEmpty, find, propEq, pathOr, prop } from 'ramda'
import { Trash2 } from 'react-feather'

import CartButton from '~/components/elements/Buttons/CartButton'
import { setItemToCart } from '~/components/cart/storage'
import { useCartData } from '~/providers/CartProvider'
import { useTranslate } from '~/utils/translate'
import numberFormat from '~/utils/numberFormat'
import { mediaQueries } from '~/constants/mediaQueries'

const Row = styled.div`
  display: grid;
  grid: 1fr / min-content 1fr;
  grid-gap: 18px;
`
const Card = styled.div`
  background: #fff;
  border-radius: 5px;
  margin-bottom: 60px;
  @media ${mediaQueries.laptopS} {
    margin-bottom: 0px;
  }
`
const Description = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;
`
const ProductName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.standard};
  line-height: 129.96%;
  margin-bottom: 6px;
  font-weight: 500;
`
const Counter = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`
const DeleteButton = styled('div')`
  cursor: pointer;
  border: none;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
  }
  &:hover svg{
    stroke: #eb4225;
  }
`
const Img = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95px;
  height: 95px;
  padding: 5px;
  img{
    width: 100%;
    height: 100%;
  }
`
const ContentPosition = styled.div``
const ProductArticul = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.secondary};
  @media ${mediaQueries.laptopS} {
    display: none;
  }
`

const ProductPrice = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.secondary};
`
const ProductRow = styled('div')`
  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid #e7e8ea;
  :nth-last-child(1){
    border-bottom: none;
  }
`

const Cart = props => {
  const { onDelete, products = [] } = props
  const { translateData } = useTranslate()

  const [, dispatch] = useCartData()
  const handleAdd = (product, value, mathValue) => {
    return setItemToCart((+value + mathValue).toFixed(1), product, dispatch)
  }
  const handleRemove = (product, value, mathValue) => {
    return setItemToCart((+value - mathValue).toFixed(1), product, dispatch)
  }

  return (
    <div>
      {isEmpty(products)
        ? (
          <ContentPosition>
            <Card>
              <ProductRow>
                <div>
                Ваша корзина пуста
                </div>
              </ProductRow>
            </Card>
          </ContentPosition>
        )
        : (
          <Card>
            {products.map((product, key) => {
              const images = pathOr([], ['images'], product)
              const isPrimary = find(propEq('isPrimary', true))(images)
              const image = path(['file'], isPrimary)
              const name = path(['name'], product)
              const color = path(['color'], product)
              const colorName = translateData(color, 'name')
              const id = path(['id'], product)
              const price = +path(['price'], product) || 0
              const amount = path(['amount'], product)
              const shortDescription = path(['shortDescription'], product)

              const measurement = prop('measurement', product)
              const measurementName = prop('name', measurement)

              const isCustomWeight = measurementName &&
              (measurementName.toLowerCase() === 'кг' || measurementName.toLowerCase() === 'kg')

              const mathValue = isCustomWeight ? 0.2 : 1

              return (
                <ProductRow key={key}>
                  <Row
                  >
                    <Img>
                      <img
                        src={'/assets/armchair.png' || image}
                        alt={'image'}
                      />
                    </Img>
                    <div>
                      <Description>
                        <ProductName>{name}</ProductName>
                        <ProductArticul>Цвет: {colorName}</ProductArticul>
                        <ProductArticul>{shortDescription}</ProductArticul>
                        <ProductPrice>Стоимость: {numberFormat(price, 'сум')}</ProductPrice>
                      </Description>
                      <Buttons>
                        <DeleteButton
                          onClick={() => onDelete(id)}
                        >
                          <Trash2 />
                        </DeleteButton>
                        <Counter>
                          <CartButton
                            amount={amount}
                            onAdd={() => handleAdd(product, amount, mathValue)}
                            onRemove={() => handleRemove(product, amount, mathValue)}
                            measurement={measurementName}
                          />
                        </Counter>
                      </Buttons>
                    </div>
                  </Row>
                </ProductRow>
              )
            })}
          </Card>
        )}
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  onDelete: PropTypes.func
}

export default Cart
