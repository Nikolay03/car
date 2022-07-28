import React from 'react'
import styled from 'styled-components'

import Container from '~/components/elements/Container'
import SignInForm from '~/view/sign-in/SignInForm'

const ContainerUI = styled(Container)`
  padding: 35px 15px 40px;
`
const Title = styled('h1')`
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  color: #2e384c;
  margin: 0 0 35px;
`
const SignIn = props => {
  // Render
  return (
    <>
      <ContainerUI>
        <Title>
          Авторизация
        </Title>
        <SignInForm />
      </ContainerUI>
    </>
  )
}

export default SignIn
