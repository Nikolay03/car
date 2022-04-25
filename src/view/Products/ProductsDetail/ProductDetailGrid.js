import React from 'react'
import styled from 'styled-components'

import Container from '~/components/elements/Container'
import Title from '~/components/elements/Title'
import ProductDetailCarousel from '~/view/Products/ProductsDetail/ProductDetailCarousel'

const ProductDetails = styled('div')`
  width: 50%;
  & h1 {
    font-weight: 300;
  }
`

const StyledContainer = styled(Container)`
  margin-top: 60px;
  display: flex;
`
const Colors = styled.div`
  margin-top: 36px;
  display: flex;
  & div:not(:last-child) {
    margin-right: 5px;
  }
`

const Ul = styled('ul')`
  
`

const ColorBorder = styled.div`
  padding: 3px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(0, 255, 255);
 & div {
   display: flex;
   align-items: center;
   width: 100%;
   height: 100%;
   background-color: rgb(0, 255, 255);
   border-radius: 100%;
 }
`

const ProductDetailGrid = props => {
  return (
    <StyledContainer>
      <ProductDetailCarousel />
      <ProductDetails>
        <Title as={'h1'}>Ultimate over-ear headphones</Title>
        <Ul>
          Цвет средней части: красный
          Цвет ниток: чёрный
          Материал: боковая часть «корейский», по середине тканый
          Плотность ткани: 1386 гр. на кв.м.
          Толщина поролона: по середине — нет, по краям — 0,5 см.
          Плотность поролона: 35%
          Рекомендация по уходу: только химчистка</Ul>
        <Colors>{[5, 4, 3, 2, 1].map(i => <ColorBorder key={i}><div /></ColorBorder>)}</Colors>
      </ProductDetails>
    </StyledContainer>
  )
}

export default ProductDetailGrid
