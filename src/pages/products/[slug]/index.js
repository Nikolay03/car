import ProductDetailGrid from '~/view/Products/ProductsDetail/ProductDetailGrid'
import { fetchData } from '~/utils/fetch'
import GridLayout from '~/layout/GridLayout'
import Layout from '~/layout/Layout'

const ProductDetail = (props) => {
  return (
    <Layout >
      <GridLayout way={[
        {
          url: '/',
          title: 'Главная'
        }
      ]} currentWay={'Phone'}>
        <ProductDetailGrid {...props} />
      </GridLayout>
    </Layout>
  )
}

export async function getServerSideProps ({ params }) {
  const { slug } = params

  try {
    // const data = await fetchData(sprintf(GALLERY_DETAIL, slug))

    return {
      props: {
        // data
      }
    }
  }

  catch (e) {
    return {
      notFound: true
    }
  }
}

export default ProductDetail
