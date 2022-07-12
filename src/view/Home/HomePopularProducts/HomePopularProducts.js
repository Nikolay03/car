import React, { useRef } from 'react'
import styled from 'styled-components'

import Carousel from '~/components/Carousel'
import ProductCard from '~/components/ProductCard'
import { useHomeData } from '~/view/Home/HomeProvider'
import { getListData } from '~/utils/fetch'
import { useTranslate } from '~/utils/translate'

const FullWidth = styled.div`
  padding-top: 70px;
  width: calc(100vw - 5px);
  overflow: hidden;
`

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
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

const HomePopularProducts = () => {
  const { translateData } = useTranslate()
  const { popularProductData } = useHomeData()

  const {
    results
  } = getListData(popularProductData)
  const carouselRef = useRef(null)
  return (
    <>
      <FullWidth>
        {results.map((i, key) => {
          if (key === 1) {
            const id = i?.id
            const products = i?.products
            const title = translateData(i, 'title')
            return (
              <Carousel
                key={id}
                title={title}
                innerRef={carouselRef}
                responsive={responsive}
              >
                {products.map((item) => {
                  const id = item?.id
                  return (
                    <ProductCard key={id} data={item} />
                  )
                })}
              </Carousel>
            )
          }
          return null
        })}
      </FullWidth>
    </>
  )
}

export default HomePopularProducts
