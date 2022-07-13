import React from 'react'
import styled from 'styled-components'

import Header from '~/components/Header'
import Footer from '~/components/Footer'

const Wrapper = styled.div`
  padding-top: 81px;
`
// Component
const Layout = ({ children, underLine }) => {
  return (
    <>
      <Header underLine={underLine} />
      <Wrapper>
        {children}
      </Wrapper>
      <Footer />
    </>
  )
}

export default Layout
