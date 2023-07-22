import React from 'react'
import { sprintf } from 'sprintf-js'
import { prop } from 'ramda'
import { useRouter } from 'next/router'

import { fetchData } from '~/utils/fetch'
import * as API from '~/constants/api'
import CategoryGrid from '~/view/Category/CategoryGrid'
import Layout from '~/layout/Layout'
import Container from '~/components/elements/Container'
import CategoryProvider from '~/view/Category/CategoryProvider'
import useRequest from '~/hooks/api/useRequest'

const CategoryDetail = ({ productData, api, ...props }) => {
  const router = useRouter()
  const category = router?.query?.category || router?.query?.slug
  const productDataList = useRequest(api, {
    params: {
      category
    },
    disableLocale: true,
    initialData: productData
  })
  return (
    <CategoryProvider {...props}>
      <Layout underLine={true}>
        <Container>
          <CategoryGrid productDataList={productDataList} />
        </Container>
      </Layout>
    </CategoryProvider>
  )
}

export async function getServerSideProps (ctx) {
  const { query, params } = ctx
  const { slug } = params
  const api = API.PRODUCT_LIST

  const productData = await fetchData(api, {
    page_size: 10,
    color: prop('color', query),
    category: prop('category', query) || slug,
    ordering: prop('ordering', query)
  })
  const productCategoryData = await fetchData(API.PRODUCT_CATEGORY_LIST, {
    page_size: 10
  })

  const productColorData = await fetchData(API.CATEGORY_CATEGORY_COLOR_LIST, {
    page_size: 3
  })

  const categoryData = await fetchData(sprintf(API.CATEGORY_CATEGORY_DETAIL_LIST, slug), {
    page_size: 3
  })

  return {
    props: {
      api,
      productData,
      categoryData,
      productCategoryData,
      productColorData
    }
  }
}

export default CategoryDetail
