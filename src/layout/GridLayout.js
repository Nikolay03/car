import styled from 'styled-components'
import React from 'react'

import Breadcrumbs from '~/components/Breadcrumbs'
import Container from '~/components/elements/Container'

const ContainerStyled = styled(Container)`

`
const GridLayout = ({ way, currentWay, children, ...props }) => {
  return (
    <>
      <ContainerStyled>
        <Breadcrumbs way={way} currentWay={currentWay} {...props} />
      </ContainerStyled>
      {children}
    </>
  )
}

export default GridLayout
