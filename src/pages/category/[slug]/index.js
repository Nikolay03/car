import React from 'react'

import { fetchData } from '~/utils/fetch'
import * as API from '~/constants/api'
import CategoryGrid from '~/view/Category/CategoryGrid'
import Layout from '~/layout/Layout'
import Container from '~/components/elements/Container'
import CategoryProvider from '~/view/Category/CategoryProvider'

const CategoryDetail = (props) => {
  return (
    <CategoryProvider {...props}>
      <Layout underLine={true}>
        <Container>
          <CategoryGrid />
        </Container>
      </Layout>
    </CategoryProvider>
  )
}

export async function getServerSideProps ({ params }) {
  const api = API.PRODUCT_LIST

  const productData = await fetchData(api, {
    page_size: 10,
    ordering: 'price'
  })

  const productCategoryData = await fetchData(API.PRODUCT_CATEGORY_LIST, {
    page_size: 10
  })

  return {
    props: {
      api,
      productData,
      productCategoryData
    }
  }
}

export default CategoryDetail
