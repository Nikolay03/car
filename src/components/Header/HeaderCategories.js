import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import Container from '~/components/elements/Container'

const ContainerStyled = styled(Container)`
  padding: 25px 56px;
  display: flex;
`

const Categories = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  & li {
    font-weight: 600;
    transition: padding 0.3s ease-in-out;
    position: relative;
    font-size: ${({ theme }) => theme.fontSize.capitalMedium};
    &:after {
      content: " ";
      position: absolute;
      bottom: -2px;
      left: 0px;
      height: 2px;
      background-color: black;
      transform-origin: 0% 100%;
      transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;;
      width: ${({ isActive }) => isActive ? '100%' : '0px'};
    };
  }
  & li:hover {
    &:after {
      width: 100%;
    };
    padding-left: 15px;
  }
`

const Block = styled.div`
  text-align: left;
  font-size: 14px;
  & p {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.color.secondary};
  }
`

const PopularBlock = styled(Block)`
  width: 100%;
  margin-left: 90px;
`

const Popular = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template: 1fr / repeat(auto-fill, minmax(120px, 1fr));
`

const Good = styled.div`
  
`

const categories = [
  {
    name: 'One'
  },
  {
    name: 'Two'
  },
  {
    name: 'Three'
  },
  {
    name: 'Four'
  }
]

const images = [
  {
    url: '/assets/good.jpg'
  },
  {
    url: '/assets/good.jpg'
  },
  {
    url: '/assets/good.jpg'
  },
  {
    url: '/assets/good.jpg'
  }
]
const HeaderCategories = props => {
  return (
    <ContainerStyled>
      <Block>
        <p>Категории</p>
        <Categories>
          {categories.map(i => (
            <li key={i.name}>
              <a href={''}>{i.name}</a>
            </li>
          ))}
        </Categories>
      </Block>
      <PopularBlock>
        <p>Самые популярные</p>
        <Popular>
          {images.map((i, key) => (
            <Good
              key={key}
            >
              <Image
                height={'150px'}
                width={'120x'}
                src={i.url}
                alt={'Picture of the author'}
              />
            </Good>
          ))}
        </Popular>
      </PopularBlock>
    </ContainerStyled>
  )
}

export default HeaderCategories
