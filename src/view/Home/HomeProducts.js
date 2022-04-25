import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import { sprintf } from 'sprintf-js'

import ProductCard from '~/view/Home/ProductCard'
import Container from '~/components/elements/Container'
import Title from '~/components/elements/Title'
import { PRODUCTS_ITEM_URL } from '~/constants/routes'

const StyledCot = styled(Container)`
 & h1 {
   padding: 70px 0px;
   text-align: center;
 }
`
const Products = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template: 1fr / repeat(auto-fill, minmax(300px, 1fr));
`
const Box = styled.div`
  cursor: pointer;
  & :hover {
    & :after {
      width: 100%;
    };
  }
`
const HomeProducts = props => {
  return (
    <StyledCot>
      <Title as={'h1'}>Магазин</Title>
      <Products>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
          <NextLink
            href={sprintf(PRODUCTS_ITEM_URL, item)}
            key={item}
          >
            <Box >
              <ProductCard data={item} />
            </Box>
          </NextLink>
        ))}
      </Products>
    </StyledCot>
  )
}

export default HomeProducts
