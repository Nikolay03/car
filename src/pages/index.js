import React from 'react'

import HomeGrid from '~/view/Home/HomeGrid'
import Layout from '~/layout/Layout'
import HomeProvider from '~/view/Home/HomeProvider'
import { fetchData } from '~/utils/fetch'
import * as API from '~/constants/api'

const Home = (props) => {
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
    page_size: 10,
    ordering: 'price'
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
