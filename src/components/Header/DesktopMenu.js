import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import { sprintf } from 'sprintf-js'

import HeaderCategories from '~/components/Header/HeaderCategories'
import { useTranslate } from '~/utils/translate'
import { useAppData } from '~/providers/DataProvider'
import { getListData } from '~/utils/fetch'
import { CATEGORY_ITEM_URL } from '~/constants/routes'
import Languages from '~/components/Header/Languages'
import { mediaQueries } from '~/constants/mediaQueries'
import BasketUi from '~/components/Header/Basket'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media ${mediaQueries.laptopS} {
    display: none;
  }
`
const CategoriesWrapper = styled.div`
  visibility: hidden;
  transform: scaleY(0);
  opacity: 0;
  z-index: 100000;
  transform-origin: top center;
  transition: all 0.3s ease-in-out;
  transition-delay: 0.1s;
  position: fixed;
  background: white;
  top: 81px;
  left: 0px;
  right: 0px;
  box-shadow: 0px 2px 10px rgba(224, 224, 224, 0.57);
`

const MenuItem = styled.li`
  padding-bottom: 3px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 80px;
  margin: 0px 15px;
  width: 100%;
  grid-gap: 40px;
  text-align: center;
  & a {
    font-weight: 500;
    height: min-content;
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      bottom: -2px;
      left: 0px;
      height: 2px;
      background-color: #111;
      transform-origin: 0% 100%;
      transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;;
      width: ${({ isActive }) => isActive ? '100%' : '0px'};
    };
  }
`

const Menu = styled.ul`
  display: flex;
  margin-right: auto;
  & ${MenuItem}:hover {
    & > a {
      &:after {
        width: 100%;
      };
    };
    & ${CategoriesWrapper} {
      transition-delay: 0s;
      transition: all 0.4s ease-in-out;
      visibility: visible;
      opacity: 1;
      transform: scaleY(1)
    }
  }
`

const RighrSide = styled.div`
  display: grid;
  grid-gap: 25px;
  grid: 1fr / repeat(3, auto);
  align-items: center;
  & svg {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`

const DesktopMenu = props => {
  const { translateData } = useTranslate()
  const { categoryData } = useAppData()
  const {
    results
  } = getListData(categoryData)
  return (
    <Wrapper>
      <Menu>
        {results.map((i, key) => {
          const name = translateData(i, 'name')
          const id = i.id
          const children = i.children
          return (
            <MenuItem
              key={key}
            >
              <NextLink href={sprintf(CATEGORY_ITEM_URL, id)}>{name}</NextLink>
              <CategoriesWrapper>
                <HeaderCategories data={children} categoryId={id} />
              </CategoriesWrapper>
            </MenuItem>
          )
        }
        )}
      </Menu>
      <RighrSide>
        <a href={'tel:+998998884888'}>+998 (99) 888 48 88</a>
        <Languages />
        {/* <Heart /> */}
        <BasketUi />
      </RighrSide>
    </Wrapper>
  )
}

export default DesktopMenu
