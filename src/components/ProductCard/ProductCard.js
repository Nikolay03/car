import React from 'react'
import styled from 'styled-components'

import Image from '~/components/Images/Image'
import { useTranslate } from '~/utils/translate'

const ItemWrapper = styled('div')`
  padding: 0px 11px;
`

const Item = styled('div')`
  position: relative;
  cursor: pointer;
`

const ImageCont = styled.div`
  padding: 30px 0px 30px 0px;
  background-color: ${({ theme }) => theme.table.backgroundColor};
`

const SubTitle = styled('p')`
  margin-top: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`

const Description = styled('p')`
  margin-top: 5px;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.color.secondary};
`

const ProductCard = ({ data }) => {
  const { translateData } = useTranslate()

  const title = translateData(data, 'name')
  const description = translateData(data, 'shortDescription')

  const price = data?.price
  return (
    <ItemWrapper>
      <Item>
        <ImageCont>
          <Image
            objectFit={'contain'}
            src={'/assets/armchair.png'}
            alt={'banner'}
            style={{ height: '300px', width: '100%', userSelect: 'none' }}
          />
        </ImageCont>
        <SubTitle>{title} <span>{price} сум</span></SubTitle>
        <Description>{description}</Description>
      </Item>
    </ItemWrapper>
  )
}

export default ProductCard
