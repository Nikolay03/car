import React from 'react'
import styled from 'styled-components'

import Logo from '~/icons/Logo'
import Title from '~/components/elements/Title'

const Wrapper = styled.div`
  padding: 200px;
  display: grid;
  grid-gap: 25px;
  align-items: center;
  justify-content: center;
  * {
    text-align: center;
  }
`
const Home = (props) => {
  return (
    <Wrapper>
      <Logo height={120} width={240} />
      <Title as={'h2'} color={'dark'}>Сайт находится в разработке</Title>
      <p>скоро будет готово</p>
    </Wrapper>
  )
}

export default Home
