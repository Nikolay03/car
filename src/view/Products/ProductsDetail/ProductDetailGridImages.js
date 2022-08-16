import React, { useRef } from 'react'
import styled from 'styled-components'

import Image from '~/components/Images/Image'
import Carousel from '~/components/Carousel'
import { mediaQueries } from '~/constants/mediaQueries'
import Skelet from '~/components/Skelet'

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
`

const Desctop = styled.div`
  display: block;
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

const ProductDetailGridImages = ({ images, isLoading }) => {
  const carouselRef = useRef(null)
  return (
    <>
      <Desctop>
        {isLoading
          ? (
            <Skelet count={5} />
          )
          : (
            <Grid>
              {images.map((i, index) => {
                const image = i.image?.file
                const name = i.image?.name
                return (
                  <ImageCont
                    key={index}
                  >
                    <Image
                      objectFit={'contain'}
                      src={image}
                      alt={name}
                      style={{ height: '300px', width: '100%', userSelect: 'none' }}
                    />
                  </ImageCont>
                )
              })}
            </Grid>
          )
        }
      </Desctop>
      <MobileVariant>
        {isLoading
          ? (<Skelet count={2} />)
          : (
            <Carousel
              innerRef={carouselRef}
              responsive={responsive}
            >
              {images.map((item, index) => {
                const image = item.image?.file
                const name = item.image?.name
                return (
                  <Item key={index}>
                    <ImageCont>
                      <Image
                        objectFit={'contain'}
                        src={image}
                        alt={name}
                        style={{ height: '300px', width: '100%', userSelect: 'none' }}
                      />
                    </ImageCont>
                  </Item>
                )
              })}
            </Carousel>
          )
        }
      </MobileVariant>
    </>
  )
}

export default ProductDetailGridImages
