import React from 'react'
import styled from 'styled-components'

import HomeBanner from '~/view/Home/HomeBanner/HomeBaner'
import HomeProducts from '~/view/Home/HomeProducts/HomeProducts'
import HomeSection from '~/components/elements/HomeSection'
import HomeCollection from '~/view/Home/HomeCollection/HomeCollection'
import HomePopularProducts from '~/view/Home/HomePopularProducts/HomePopularProducts'

const Wrapper = styled.div`
`
const HomeGrid = props => {
  return (
    <Wrapper>
      <HomeBanner />
      <HomeSection>
        <HomeProducts />
      </HomeSection>
      <HomeSection>
        <HomeCollection />
      </HomeSection>
      <HomeSection>
        <HomePopularProducts />
      </HomeSection>
    </Wrapper>
  )
}

export default HomeGrid
