import React from 'react'
import PropTypes from 'prop-types'
import { ChevronLeft } from 'react-feather'
import styled from 'styled-components'

import hexToRgba from '~/utils/hexToRgba'
import Circle from '~/components/Carousel/Circle'

const CircleStyled = styled(Circle)`
  position: absolute;
`
function CarouselArrow (props) {
  const { onClick, ...rest } = props

  const white = hexToRgba('#FFFFFF', '0.7')

  return (
    <CircleStyled
      bgColor={white}
      cursor={'pointer'}
      display={'flex'}
      mx={'6px'}
      size={'30px'}
      onClick={onClick}
      {...rest}
    >
      <ChevronLeft />
    </CircleStyled>
  )
}

CarouselArrow.propTypes = {
  onClick: PropTypes.func
}

export default CarouselArrow
