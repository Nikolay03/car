import MultiCarousel from 'react-multi-carousel'
import CarouselDot from '~/components/Carousel/CarouselDot'
import CarouselArrow from '~/components/Carousel/CarouselArrow'

export default function Carousel (props) {
  const { children, innerRef, ...restProps } = props

  return (
    <MultiCarousel
      autoPlay={true}
      autoPlaySpeed={5000}
      arrows={false}
      customDot={<CarouselDot />}
      customLeftArrow={<CarouselArrow left={'calc(2% + 1px)'} />}
      customRightArrow={<CarouselArrow right={'calc(2% + 1px)'} transform={'rotate(180deg)'} />}
      deviceType={'desktop'}
      draggable={false}
      infinite={true}
      itemClass={'carousel-item'}
      ssr={true}
      renderDotsOutside={true}
      ref={innerRef}
      {...restProps}
    >
      {children}
    </MultiCarousel>
  )
}
