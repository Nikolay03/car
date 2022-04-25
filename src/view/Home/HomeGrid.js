import React from 'react'
import styled from 'styled-components'

import HomeProducts from '~/view/Home/HomeProducts'

const Wrapper = styled.div`
`
const HomeGrid = props => {
  return (
    <Wrapper>
      <HomeProducts />
    </Wrapper>
  )
}

export default HomeGrid
