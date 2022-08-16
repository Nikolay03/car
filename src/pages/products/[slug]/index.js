import React from 'react'
import { sprintf } from 'sprintf-js'
import { prop } from 'ramda'

import ProductDetailGrid from '~/view/Products/ProductsDetail/ProductDetailGrid'
import Layout from '~/layout/Layout'
import withFilter from '~/hooks/withFilter'
import * as API from '~/constants/api'
import { fetchData } from '~/utils/fetch'
import ProductProvider from '~/view/Products/ProductsDetail/ProductProvider'
import useRequest from '~/hooks/api/useRequest'

const ProductDetail = ({ api, productData, ...props }) => {
  const filterActions = withFilter({ fields: ['color', 'carType'] })
  const productDataList = useRequest(api, {
    disableLocale: true,
    disableUrlParams: true,
    params: filterActions.initialValues?.carType && {
      carType: filterActions.initialValues?.carType
    },
    initialData: productData
  })
  return (
    <Layout>
      <ProductProvider productDataList={productDataList} {...props}>
        <ProductDetailGrid {...filterActions} {...props} />
      </ProductProvider>
    </Layout>
  )
}

export async function getServerSideProps (ctx) {
  const {
    query,
    params
  } = ctx
  const { slug } = params
  const api = sprintf(API.PRODUCT_ITEM, slug)
  const productData = await fetchData(api, {
    page_size: 10,
    car_type: prop('carType', query)
  })

  const productSimilarData = await fetchData(API.PRODUCT_SIMILAR_LIST, {
    page_size: 10,
    product: slug
  })

  return {
    props: {
      api,
      productData,
      productSimilarData
    }
  }
}

export default ProductDetail
