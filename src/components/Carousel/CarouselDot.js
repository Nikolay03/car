import React from 'react'

import Circle from '~/components/Carousel/Circle'

function CarouselDot (props) {
  const { onClick, active } = props

  return (
    <Circle
      bgColor={active ? '#000' : '#eee'}
      cursor={'pointer'}
      onClick={onClick}
    />
  )
}

export default CarouselDot
