import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import numberFormat from '~/utils/numberFormat'

const DelPrice = styled.span`
  position: relative;
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ fontSize }) => fontSize || '14px'};
  line-height: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ bold }) => bold};
  padding: 0 3px;
  ${({ style }) => style};
`
const DelLine = styled.span`
  position: absolute;
  background: ${({ theme }) => theme.palette.green};
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 2px;
  content: "";
`

const SalePrice = props => {
  const {
    price = 0,
    bold = 500,
    fontSize,
    style
  } = props

  // Render
  if (price && +price !== 0) {
    return (
      <DelPrice
        fontSize={fontSize}
        bold={bold}
        style={style}
      >
        {numberFormat(price, 'сум')}
        <DelLine />
      </DelPrice>
    )
  }
  return false
}

SalePrice.propTypes = {
  price: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  fontSize: PropTypes.string,
  bold: PropTypes.number,
  style: PropTypes.object
}

export default SalePrice
