import React from 'react'
import styled from 'styled-components'
import { sprintf } from 'sprintf-js'
import { prop } from 'ramda'
import Link from 'next/link'

import * as ROUTES from '~/constants/routes'
import Image from '~/components/Images/Image'
import { useTranslate } from '~/utils/translate'
import numberFormat from '~/utils/numberFormat'

const ItemWrapper = styled('div')`
  padding: 0px 11px;
`

const Title = styled.span``
const Hover = styled.div`
  & ${Title} {
      position: relative;
      &:after {
        content: " ";
        position: absolute;
        bottom: -2px;
        left: 0px;
        height: 2px;
        background-color: #111;
        transform-origin: 0% 100%;
        transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;;
        width: ${({ isActive }) => isActive ? '100%' : '0px'};
      };
    };
  &:hover {
    & ${Title} {
      &:after {
        width: 100%;
      };
    };
  };
`

const Item = styled('div')`
  position: relative;
  user-select: none;
`

const ImageCont = styled.div`
  padding: 30px 0px 30px 0px;
  background-color: ${({ theme }) => theme.table.backgroundColor};
  pointer-events: none;
`

const SubTitle = styled('p')`
  margin-top: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`

const Description = styled('p')`
  margin-top: 5px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.color.secondary};
`

const ProductCard = ({ data, priceBottom }) => {
  const { translateData } = useTranslate()
  const id = prop('id', data)

  const title = translateData(data, 'name')
  const description = translateData(data, 'shortDescription')

  const price = data?.price
  return (
    <ItemWrapper>
      <Item>
        <div>
          <ImageCont>
            <Image
              objectFit={'contain'}
              src={'/assets/armchair.png'}
              alt={'banner'}
              style={{ height: '300px', width: '100%', userSelect: 'none' }}
            />
          </ImageCont>
          <Link href={sprintf(ROUTES.PRODUCTS_ITEM_URL, id)}>
            <Hover>
              <SubTitle><Title>{title}</Title> {!priceBottom && (<span>{numberFormat(price)} сум</span>)}</SubTitle>
              <Description>{description}</Description>
            </Hover>
          </Link>
          {priceBottom && <SubTitle>{price} сум</SubTitle>}
        </div>
      </Item>
    </ItemWrapper>
  )
}

export default ProductCard
