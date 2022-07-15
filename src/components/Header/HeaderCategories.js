import { sprintf } from 'sprintf-js'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import Container from '~/components/elements/Container'
import { useTranslate } from '~/utils/translate'
import { CATEGORY_ITEM_URL } from '~/constants/routes'

const ContainerStyled = styled(Container)`
  padding: 25px 56px;
  display: grid;
`

const Categories = styled.ul`
  display: grid;
  grid-gap: 16px;
  & li {
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.capitalMedium};
    & a {
      position: relative;
      transition: padding 0.3s ease-in-out;
      padding-right: 15px;
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
  }
  & li {
    a:hover {
      padding-left: 15px;
      padding-right: 0px;
      &:after {
        width: 100%;
      };
    }
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

const HeaderCategories = ({ data, categoryId }) => {
  const { translateData } = useTranslate()
  return (
    <ContainerStyled style={{ grid: `1fr / repeat(${data.length}, 1fr)` }}>
      {data.map(category => {
        const id = category.id
        const name = translateData(category, 'name')
        const children = category.children
        return (
          <Block key={id}>
            <p>{name}</p>
            <Categories>
              {children.map(i => {
                const idCh = i.id
                const nameCh = translateData(i, 'name')
                return (
                  <li key={idCh}>
                    <Link href={{
                      pathname: sprintf(CATEGORY_ITEM_URL, categoryId),
                      query: {category: idCh}
                    }}>{nameCh}</Link>
                  </li>
                )
              })}
            </Categories>
          </Block>
        )
      })}
    </ContainerStyled>
  )
}

export default HeaderCategories
