import React from 'react'
import MultiCarousel from 'react-multi-carousel'
import Image from 'next/image'
import styled from 'styled-components'

const width = '25px'
const Product = styled('div')`
  position: relative;
  padding-left: 60px;
  width: 50%;
  margin-right: 80px;
  & .react-multi-carousel-dot-list {
    flex-direction: column;
    left: 20px;
    width: ${width}
  }
`
const ImageContainer = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
  width: 100%;
`

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

const images = [
  {
    url: '/assets/good.jpg'
  },
  {
    url: '/assets/good.jpg'
  },
  {
    url: '/assets/good.jpg'
  },
  {
    url: '/assets/good.jpg'
  }
]
const CustomDot = ({ onClick, ...rest }) => {
  const {
    onMove,
    index,
    active,
    carouselState: { currentSlide, deviceType }
  } = rest
  console.warn(images[index])
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <button
      className={active ? 'active' : 'inactive'}
      onClick={() => onClick()}
    >
      <Image
        width={'100px'}
        height={'100px'}
        src={images[index].url}
        alt={'Picture of the author'}
      />
    </button>
  )
}

const ProductDetailCarousel = props => {
  return (
    <Product>
      <MultiCarousel
        responsive={responsive}
        arrows={false}
        ssr={true}
        customDot={<CustomDot />}
        renderDotsOutside={true}
        autoPlay={false}
        autoPlaySpeed={8000}
        infinite={true}
        pauseOnHover={true}
        partialVisible={false}
        containerClass={'react-cert-carousel-list'}
        showDots={true}
      >
        {images.map((item, key) => (
          <ImageContainer key={key}>
            <Image
              width={'100%'}
              height={'100%'}
              layout={'responsive'}
              objectFit={'cover'}
              src={item.url}
              alt={'Picture of the author'}
            />
          </ImageContainer>
        ))}
      </MultiCarousel>
    </Product>
  )
}

export default ProductDetailCarousel
