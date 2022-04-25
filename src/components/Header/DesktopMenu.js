import React from 'react'
import styled, { keyframes } from 'styled-components'

import menus from '~/constants/menus'
import HeaderCategories from '~/components/Header/HeaderCategories'

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
  display: flex;
  align-items: center;
  height: 80px;
  margin: 0px 15px;
  width: 100%;
  grid-gap: 40px;
  text-align: center;
  & a {
    font-weight: 600;
    height: min-content;
    position: relative;
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
`

const Menu = styled.ul`
  display: flex;
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

const DesktopMenu = props => {
  return (
    <>
      <Menu>
        {menus.map((i, key) => {
          const name = i.name
          const url = i.url
          return (
            <MenuItem
              className={'dfgdfg'}
              key={key}
            >
              <a href={url}>{name}</a>
              <CategoriesWrapper>
                <HeaderCategories />
              </CategoriesWrapper>
            </MenuItem>
          )
        }
        )}
      </Menu>
    </>
  )
}

export default DesktopMenu
