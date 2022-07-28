import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import numberFormat from '~/utils/numberFormat'

const PriceStyled = styled.div`
  color: ${({ active, theme }) => active ? theme.palette.green : theme.palette.black};
  font-size: 18px;
  line-height: ${({ active }) => active ? '26px' : '18px'};
  font-weight: 700;
`

const Price = (props) => {
  const { price, withDiscount = false } = props
  return (
    <PriceStyled
      active={withDiscount}
    >
      {numberFormat(price)} сум
    </PriceStyled>
  )
}

Price.propTypes = {
  price: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  withDiscount: PropTypes.bool
}

export default Price
