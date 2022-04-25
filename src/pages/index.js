import React from 'react'

import HomeGrid from '~/view/Home/HomeGrid'
import Layout from '~/layout/Layout'

const Home = (props) => {
  return (
    <Layout>
      <HomeGrid {...props} />
    </Layout>
  )
}
export async function getServerSideProps () {
  return {
    props: {
    }
  }
}

export default Home
