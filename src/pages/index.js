import React from 'react'
import styled from 'styled-components'

import HomeGrid from '~/view/Home/HomeGrid'
import Layout from '~/layout/Layout'
import HomeProvider from '~/view/Home/HomeProvider'
import { fetchData } from '~/utils/fetch'
import * as API from '~/constants/api'
import Logo from '~/icons/Logo'
import Title from '~/components/elements/Title'

const Wrapper = styled.div`
  padding: 200px;
  display: grid;
  grid-gap: 25px;
  align-items: center;
  justify-content: center;
  * {
    text-align: center;
  }
`

const DisablePage = true
const Home = (props) => {
  if (DisablePage) {
    <Wrapper>
      <Logo height={120} width={240} />
      <Title as={'h2'} color={'dark'}>Сайт находится в разработке</Title>
      <p>скоро будет готово</p>
    </Wrapper>
  }
  return (
    <HomeProvider {...props}>
      <Layout>
        <HomeGrid {...props} />
      </Layout>
    </HomeProvider>
  )
}

export async function getServerSideProps (ctx) {
  const bannerData = await fetchData(API.BANNER_LIST, {
    page_size: 1
  })

  const productData = await fetchData(API.PRODUCT_LIST, {
    page_size: 10
  })

  const popularProductData = await fetchData(API.PRODUCT_POPULAR_LIST, {
    page_size: 1
  })

  const productCategoryData = await fetchData(API.PRODUCT_CATEGORY_LIST, {
    page_size: 3
  })

  return {
    props: {
      bannerData,
      productData,
      popularProductData,
      productCategoryData
    }
  }
}

export default Home
