import React, { useState } from 'react'
import styled from 'styled-components'
import { find, flatten, includes, path, pipe, pluck, prop, propEq, repeat } from 'ramda'

import Container from '~/components/elements/Container'
import ProductDetailGridImages from '~/view/Products/ProductsDetail/ProductDetailGridImages'
import PageTitle from '~/components/elements/PageTitle'
import numberFormat from '~/utils/numberFormat'
import Title from '~/components/elements/Title'
import Image from '~/components/Images/Image'
import BorderBlock from '~/components/elements/BorderBlock'
import MoreButton from '~/components/elements/Buttons/MoreButton'
import CarTypesModal from '~/view/Products/ProductsDetail/ProductModal/CarTypesModal'
import { useCategoryData } from '~/view/Category/CategoryProvider'
import { getListData } from '~/utils/fetch'
import Button from '~/components/elements/Buttons/Button'
import CartButton from '~/components/elements/Buttons/CartButton'
import useCartActions from '~/hooks/useCartActions'
import { useCartData } from '~/providers/CartProvider'
import { trimString } from '~/utils/trimString'
import { useTranslate } from '~/utils/translate'
import { mediaQueries } from '~/constants/mediaQueries'

const ProductDetails = styled('div')`
  @media ${mediaQueries.tabletL} {
    padding: 0 15px;
  }
`

const SubTitle = styled.p`
  margin-top: 10px;
  color: ${({ theme }) => theme.color.secondary};
`

const Price = styled.p`
  font-weight: 600;
  margin-top: 18px;
  font-size: 16px;
`

const StyledContainer = styled(Container)`
  margin-top: 60px;
  display: grid;
  grid-gap: 60px;
  grid: 1fr / 1.67fr 1fr;
  @media ${mediaQueries.tabletL} {
    grid-gap: 40px;
    margin-top: 20px;
    padding: 15px 0px;
    grid: 1fr / 1fr;
  }
`

const Colors = styled.div`
  display: grid;
  margin-top: 10px;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
`

const AutoSize = styled.div`
  display: grid;
  margin-top: 10px;
  grid-gap: 8px;
  margin-bottom: 16px;
  grid-template-columns: repeat(auto-fill, minmax(123px, 1fr));
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonWrapper = styled('div')`
  margin-top: 40px;
`

const Text = styled('p')`
  margin-top: 40px;
`

const TextMore = styled('button')`
    font-weight: 500;
    height: min-content;
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      bottom: -2px;
      left: 0px;
      height: 1px;
      background-color: #111;
      transform-origin: 0% 100%;
      transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;;
      width: ${({ isActive }) => isActive ? '100%' : '0px'};
    };
    :hover {
      &:after {
        width: 100%;
      };
    };
`

const ColorBorder = styled.div`
  padding: 3px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.table.backgroundColor};
  align-items: center;
  border: 1px solid ${({ theme, isActive }) => isActive ? theme.palette.primary : 'transparent'};
`

const images = repeat({ src: '/assets/armchair.png', alt: 'product' }, 5)

const ProductDetailGrid = ({ onChangeFilter, initialValues }) => {
  const [open, setOpen] = useState(false)
  const onOpenToggle = () => setOpen(!open)

  const { translateData } = useTranslate()
  const { productCategoryData } = useCategoryData()
  const [products] = useCartData()
  const {
    onAddProductFirst,
    onRemoveProduct,
    onIncrementProduct,
    onDecrementProduct
  } = useCartActions()
  const {
    results
  } = getListData(productCategoryData)
  const data = prop('data', {})
  const id = prop('id', {})
  const description = translateData(data, 'description')

  const cartProduct = find(propEq('id', id))(products)
  const idChecker = path(['id'], cartProduct)
  const amount = prop('amount', cartProduct)

  const category = initialValues?.category

  return (
    <>
      <StyledContainer>
        <ProductDetailGridImages images={images} />
        <ProductDetails>
          <PageTitle>Ultimate over-ear headphones</PageTitle>
          <SubTitle>
          Чехлы из экокожи для Skoda Octavia A7 со складным креслом 2017-2020
          </SubTitle>
          <Price>
            {numberFormat(30000, 'сум')}
          </Price>

          <Title
            style={{ marginTop: '40px' }}
            color={'dark'}
            as={'h5'}>
              Цвет
          </Title>
          <Colors>
            {flatten(repeat(images, 3)).map((i, index) => (
              <ColorBorder key={index}>
                <Image
                  objectFit={'contain'}
                  src={i.src}
                  alt={'banner'}
                  style={{ height: '70px', width: '70px', userSelect: 'none' }}
                />
              </ColorBorder>
            ))}
          </Colors>

          <Title
            style={{ marginTop: '40px' }}
            color={'dark'}
            as={'h5'}>
          Размер под авто
          </Title>
          <AutoSize>
            {results.map((i, key) => {
              const children = i.children
              const hasIn = pipe(
                pluck('id'),
                includes(Number(category))
              )(children) || (key === 0)
              return hasIn && children.map(child => {
                const idCh = child.id
                const isActive = Number(category) === idCh
                return (
                  <BorderBlock
                    isActive={isActive}
                    onClick={() => onChangeFilter({ category: idCh })}
                    key={idCh}
                    name={child.name}
                  />
                )
              })
            }
            )}
          </AutoSize>
          <Center>
            <MoreButton onClick={onOpenToggle}>
            Другие модели
            </MoreButton>
          </Center>
          <ButtonWrapper>
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
          </ButtonWrapper>
          <Text>
            {trimString(description, 388)}
          </Text>
          <TextMore>Читать описание</TextMore>
        </ProductDetails>
      </StyledContainer>
      <CarTypesModal
        initialValues={initialValues}
        onChangeFilter={onChangeFilter}
        open={open}
        onToggle={onOpenToggle}
      />
    </>
  )
}

export default ProductDetailGrid
