import React, { useRef } from 'react'
import styled from 'styled-components'
import MultiCarousel from 'react-multi-carousel'

import Title from '~/components/elements/Title'
import Container from '~/components/elements/Container'
import Button from '~/components/elements/Buttons/Button'
import { useHomeData } from '~/view/Home/HomeProvider'
import { getListData } from '~/utils/fetch'
import { useTranslate } from '~/utils/translate'
import CarouselDot from '~/components/Carousel/CarouselDot'

const StyledCont = styled(Container)`
  padding: 0px 15px;
  overflow: hidden;
  & .react-multi-carousel-dot-list {
    bottom: 25px !important;
  }
`

const FullWidth = styled.div`
  background: url('/assets/banner.jpg') left center / cover no-repeat;
  max-height: 400px;
  padding: 50px 40px 100px;
  display: flex;
  align-items: center;
  justify-content: start;
`

const Content = styled.div`
  max-width: 440px;
  h1 {
    letter-spacing: -0.75px;
    margin-bottom: 20px;
    line-height: 90.6%;
  }
  p {
    color: white;
    margin-bottom: 35px;
  }
`

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
}

const HomeBanner = props => {
  const { t, translateData } = useTranslate()
  const { bannerData } = useHomeData()

  const {
    results
  } = getListData(bannerData)
  const carouselRef = useRef(null)
  return (
    <StyledCont>
      <MultiCarousel
        arrows={false}
        customDot={<CarouselDot />}
        showDots={true}
        infinite={false}
        ssr={true}
        innerRef={carouselRef}
        responsive={responsive}
      >
        {results.map(banner => {
          const id = banner.id
          const title = translateData(banner, 'title')
          const description = translateData(banner, 'description')
          return (
            <FullWidth key={id}>
              <Content>
                <Title as={'h1'}>
                  {title}
                </Title>
                <p>{description}</p>
                <Button themeType={'lighten'}>
                  {t('search')}
                </Button>
              </Content>
            </FullWidth>
          )
        })}
      </MultiCarousel>
    </StyledCont>
  )
}

export default HomeBanner
