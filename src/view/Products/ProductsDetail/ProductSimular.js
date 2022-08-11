import React, { useRef } from 'react'
import styled from 'styled-components'

import Carousel from '~/components/Carousel'
import ProductCard from '~/components/ProductCard'
import { getListData } from '~/utils/fetch'
import { useProductData } from '~/view/Products/ProductsDetail/ProductProvider'
import Title from '~/components/elements/Title'
import Container from '~/components/elements/Container'

const FullWidth = styled.div`
  padding-top: 70px;
  width: calc(100vw - 5px);
  overflow: hidden;
  & img {
    pointer-events: none;
  }
`

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
}

const ProductSimular = () => {
  const { productSimilarData } = useProductData()
  const {
    results
  } = getListData(productSimilarData)
  const carouselRef = useRef(null)
  return (
    <>
      <FullWidth>
        <Container>
          <Title color={'dark'}>Похожие продукты</Title>
        </Container>
        <Carousel
          customButtonGroup={false}
          draggable={true}
          innerRef={carouselRef}
          responsive={responsive}
        >
          {results.map((item) => {
            const idCh = item?.id
            return (
              <ProductCard key={idCh} data={item} />
            )
          })}
        </Carousel>
      </FullWidth>
    </>
  )
}

export default ProductSimular
