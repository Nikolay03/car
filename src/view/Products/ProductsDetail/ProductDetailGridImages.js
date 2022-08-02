import React, { useRef } from 'react'
import styled from 'styled-components'

import Image from '~/components/Images/Image'
import Carousel from '~/components/Carousel'
import { mediaQueries } from '~/constants/mediaQueries'

const Item = styled.div`
  padding: 0px 15px;
`
const ImageCont = styled.div`
  background-color: ${({ theme }) => theme.table.backgroundColor};
`

const Grid = styled.div`
  display: grid;
  grid-gap: 14px;
  grid-template-columns: 1fr 1fr;
  @media ${mediaQueries.tabletL} {
    display: none;
  }
`
const MobileVariant = styled.div`
  display: none;
  width: 100vw;
  overflow: hidden;
  & .react-multi-carousel-list {
    overflow: hidden !important;
  }
  @media ${mediaQueries.tabletL} {
    display: block;
  }
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

const ProductDetailGridImages = ({ images }) => {
  const carouselRef = useRef(null)
  return (
    <>
      <Grid>
        {images.map((i, index) => {
          return (
            <ImageCont
              key={index}
            >
              <Image
                objectFit={'contain'}
                src={i.src}
                alt={'banner'}
                style={{ height: '300px', width: '100%', userSelect: 'none' }}
              />
            </ImageCont>
          )
        })}
      </Grid>
      <MobileVariant>
        <Carousel
          innerRef={carouselRef}
          responsive={responsive}
        >
          {images.map((item, index) => {
            return (
              <Item key={index}>
                <ImageCont>
                  <Image
                    objectFit={'contain'}
                    src={item.src}
                    alt={'banner'}
                    style={{ height: '300px', width: '100%', userSelect: 'none' }}
                  />
                </ImageCont>
              </Item>
            )
          })}
        </Carousel>
      </MobileVariant>
    </>
  )
}

export default ProductDetailGridImages
