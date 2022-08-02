import React from 'react'

import ProductDetailGrid from '~/view/Products/ProductsDetail/ProductDetailGrid'
import Layout from '~/layout/Layout'
import withFilter from '~/hooks/withFilter'
import * as API from '~/constants/api'
import { fetchData } from '~/utils/fetch'
import ProductProvider from '~/view/Products/ProductsDetail/ProductProvider'
import CategoryProvider from '~/view/Category/CategoryProvider'

const ProductDetail = (props) => {
  const filterActions = withFilter({ fields: ['category'] })
  return (
    <Layout>
      <ProductProvider {...props}>
        <CategoryProvider {...props}>
          <ProductDetailGrid {...filterActions} {...props} />
        </CategoryProvider>
      </ProductProvider>
    </Layout>
  )
}

export async function getServerSideProps (ctx) {
  const productCategoryData = await fetchData(API.PRODUCT_CATEGORY_LIST, {
    page_size: 10
  })

  return {
    props: {
      productCategoryData
    }
  }
}

export default ProductDetail
