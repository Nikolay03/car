import React, { useState } from 'react'
import styled from 'styled-components'
import { find, groupBy, includes, path, pipe, pluck, prop, propEq, repeat, toPairs } from 'ramda'

import Container from '~/components/elements/Container'
import ProductDetailGridImages from '~/view/Products/ProductsDetail/ProductDetailGridImages'
import PageTitle from '~/components/elements/PageTitle'
import numberFormat from '~/utils/numberFormat'
import Title from '~/components/elements/Title'
import Image from '~/components/Images/Image'
import BorderBlock from '~/components/elements/BorderBlock'
import MoreButton from '~/components/elements/Buttons/MoreButton'
import CarTypesModal from '~/view/Products/ProductsDetail/ProductModal/CarTypesModal'
import Button from '~/components/elements/Buttons/Button'
import useCartActions from '~/hooks/useCartActions'
import { useCartData } from '~/providers/CartProvider'
import { trimString } from '~/utils/trimString'
import { useTranslate } from '~/utils/translate'
import { mediaQueries } from '~/constants/mediaQueries'
import { useProductData } from '~/view/Products/ProductsDetail/ProductProvider'
import ProductSimular from '~/view/Products/ProductsDetail/ProductSimular'

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
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
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
    margin-top: 15px;
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
  const { productDataList } = useProductData()
  const [products] = useCartData()
  const {
    onAddProductFirst
  } = useCartActions()
  const data = prop('data', productDataList)
  const id = prop('id', data)
  const shortDescription = translateData(data, 'shortDescription')
  const name = translateData(data, 'name')

  const cartProduct = find(propEq('id', id))(products)
  const carType = initialValues?.carType
  const color = initialValues?.color
  const price = data?.price
  const otherColors = data?.otherColors || []
  const otherCarTypes = data?.otherCarTypes || []
  const groupCarTypes = pipe(
    groupBy(path(['parent', 'name'])),
    toPairs
  )(otherCarTypes)
  return (
    <>
      <StyledContainer>
        <ProductDetailGridImages images={images} />
        <ProductDetails>
          <PageTitle>{name}</PageTitle>
          <SubTitle>
            {shortDescription}
          </SubTitle>
          <Price>
            {numberFormat(price, 'сум')}
          </Price>

          <Title
            style={{ marginTop: '40px' }}
            color={'dark'}
            as={'h5'}>
              Цвет
          </Title>
          <Colors>
            {otherColors.map((i, index) => {
              const image = path(['image', 'file'], i)
              const colorId = path(['color', 'id'], i)
              const isActive = Number(color) === colorId
              return (
                <ColorBorder
                  isActive={isActive}
                  onClick={() => onChangeFilter({ color: colorId })}
                  key={index}
                >
                  <Image
                    objectFit={'contain'}
                    src={image}
                    alt={'banner'}
                    style={{ height: '70px', width: '70px', userSelect: 'none' }}
                  />
                </ColorBorder>
              )
            })
            }
          </Colors>

          <Title
            style={{ marginTop: '40px' }}
            color={'dark'}
            as={'h5'}>
          Размер под авто
          </Title>
          <AutoSize>
            {groupCarTypes.map((i, key) => {
              const [, children] = i
              const hasIn = pipe(
                pluck('id'),
                includes(Number(carType))
              )(children) || (key === 0)
              return hasIn && children.map(child => {
                const idCh = child.id
                const isActive = Number(carType) === idCh
                return (
                  <BorderBlock
                    isActive={isActive}
                    onClick={() => onChangeFilter({ carType: idCh })}
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
            <Button
              disabled={cartProduct}
              themeType={'dark'}
              onClick={() => onAddProductFirst(data)}
              fullWidth={true}
            >
              В корзину
            </Button>
          </ButtonWrapper>
          <Text>
            {trimString(shortDescription, 388)}
          </Text>
          {(shortDescription?.length > 388) && (<TextMore>Читать описание</TextMore>)}
        </ProductDetails>
      </StyledContainer>
      <ProductSimular />
      <CarTypesModal
        initialValues={initialValues}
        onChangeFilter={onChangeFilter}
        open={open}
        groupCarTypes={groupCarTypes}
        onToggle={onOpenToggle}
      />
    </>
  )
}

export default ProductDetailGrid
