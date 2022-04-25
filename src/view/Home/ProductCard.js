import React from 'react'
import styled from 'styled-components'

import GridImages from '../../components/GridImages/GridImages'

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
  },
  {
    url: '/assets/good.jpg'
  }
]

const ImageContainer = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
  width: 100%;
`

const ProductTitle = styled.div`
  margin: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > span {
    font-weight: 600;
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      bottom: -2px;
      left: 0px;
      height: 2px;
      background-color: black;
      transform-origin: 0% 100%;
      transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;;
      width: ${({ isActive }) => isActive ? '100%' : '0px'};
    };
  }
`

const CarouselBox = styled.div`
  position: relative;
  & .react-multi-carousel-dot-list {
    bottom: 10px !important;
  }
`

const Colors = styled.div`
  display: flex;
  margin-right: -4px;
`
const Color = styled.div`
  display: flex;
  border: 2px solid white;
  align-items: center;
  width: 16px;
  height: 16px;
  background-color: rgb(0, 255, 255);
  border-radius: 50%;
  margin-left: -4px;
`
const ProductSubtitle = styled.p`
  
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

const ProductCard = props => {
  return (
    <div>
      <CarouselBox>
        {/* <MultiCarousel */}
        {/*   responsive={responsive} */}
        {/*   arrows={false} */}
        {/*   ssr={true} */}
        {/*   customDot={<CarouselDot />} */}
        {/*   autoPlay={false} */}
        {/*   autoPlaySpeed={8000} */}
        {/*   infinite={true} */}
        {/*   pauseOnHover={true} */}
        {/*   partialVisible={false} */}
        {/*   containerClass={'react-cert-carousel-list'} */}
        {/*   showDots={true} */}
        {/* > */}
        {/*   {images.map((item, key) => ( */}
        {/*     <ImageContainer key={key}> */}
        {/*       <Image */}
        {/*         width={'100%'} height={'100%'} layout={'responsive'} objectFit={'contain'} */}
        {/*         src={item.url} */}
        {/*         alt={'Picture of the author'} */}
        {/*       /> */}
        {/*     </ImageContainer> */}
        {/*   ))} */}
        {/* </MultiCarousel> */}
        <GridImages images={images} />
      </CarouselBox>
      <div>
        <ProductTitle>
          <span>Название</span>
          <Colors>{[5, 4, 3, 2, 1].map(i => <Color key={i} style={{ zIndex: i }} />)}</Colors>
        </ProductTitle>
        <ProductSubtitle>
          Какой то текст
        </ProductSubtitle>
      </div>
    </div>
  )
}

export default ProductCard
