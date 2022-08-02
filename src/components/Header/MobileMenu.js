
import React from 'react'
import styled from 'styled-components'
import { ChevronRight, Menu, X } from 'react-feather'
import NextLink from 'next/link'
import { sprintf } from 'sprintf-js'

import hexToRgba from '~/utils/hexToRgba'
import { mediaQueries } from '~/constants/mediaQueries'
import { useTranslate } from '~/utils/translate'
import { useAppData } from '~/providers/DataProvider'
import { getListData } from '~/utils/fetch'
import { CATEGORY_ITEM_URL } from '~/constants/routes'
import BasketUi from '~/components/Header/Basket'
import Languages from '~/components/Header/Languages'
import SocialItems from '~/components/Header/SocialItems'

const transition = 'all 200ms ease-out'

const Wrapper = styled('div')`
  align-self: center;
  position: relative;
  margin-left: auto;
  display: none;
  @media ${mediaQueries.laptopS} {
    display: block;
  }
`

const Grid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid: 1fr / min-content min-content;
  align-items: center;
  & a {
    white-space: nowrap;
  }
`

const IconTrigger = styled('div')`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 4vw;
  & svg {
    fill: ${({ theme }) => theme.color.primary};
  }
  :hover {
    & svg {
      transition: fill 0ms;
      fill: ${({ theme }) => theme.color.warning};
    }
  }
  @media ${mediaQueries.tabletS} {
  }
`

const Header = styled('div')`
  height: 91px;
  justify-content: flex-end;
  display: flex;
`

const CloseButton = styled('div')`
  display: flex;
  align-items: center;
  padding: 0px 19px 0px 50px;
`

const MenuContent = styled('div')`
  background: ${props => props.theme.background.primary};
  box-shadow: ${({ isOpen }) => (isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.05)' : 'none')};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: -3px;
  bottom: 0;
  transition: ${transition};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '543px')});
  overflow-y: auto;
  max-width: 300px;
  width: 100%;
  z-index: 100;
`

const ElonMusk = styled('div')`
  background-color: ${hexToRgba('#000000', 0.18)};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: ${transition};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  z-index: 90;
`

const MenuList = styled('nav')`
  flex-grow: 1;
  padding: 0px 15px 40px 40px;
  & button {
    margin-top: 15px;
  }
`

const MenuItem = styled('div')`
  color: ${props => props.theme.color.primary};
  line-height: 20px;
  padding: 15px 0px;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.capital};
  font-weight: 500;
  transition: ${props => props.theme.transition};
  & span {
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      bottom: -2px;
      left: 0px;
      height: 0.5px;
      background-color: #111;
      transform-origin: 0% 100%;
      transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;;
      width: ${({ isActive }) => isActive ? '100%' : '0px'};
    };
  }
  &.active {
    & span {
      &:after {
        width: 100%;
      };
    }
  };
  &:hover {
    & span {
      &:after {
        width: 100%;
      };
    }
  }
`

const Actions = styled.div`
  margin-top: 15px;
`

const GridActions = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 16px;
  font-weight: 500;
  grid: 1fr / 24px 1fr;
`

const ContentMenu = styled('div')`
  overflow-y: auto;
  min-height: calc(100% - 91px);
  display: flex;
  padding-bottom: 48px;
  flex-direction: column;
`

const Socials = styled.div`
  display: grid;
  grid-gap: 15px;
  grid: 1fr / 1fr;
  padding: 0px 15px 40px 40px;
  & svg {
    fill: ${props => props.theme.color.primary};
  }
`

const MobileMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)
  const onMenuOpen = () => setMenuIsOpen(true)
  const onMenuClose = () => setMenuIsOpen(false)
  React.useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      // @ts-ignore
      document.body.style = null
    }
  }, [menuIsOpen])

  const { translateData } = useTranslate()
  const { categoryData } = useAppData()
  const {
    results
  } = getListData(categoryData)

  return (
    <Wrapper>
      <Grid>
        <a href={'tel:+1-847-555-5555'}>(97) 733-30-06</a>
        <IconTrigger onClick={onMenuOpen}>
          <Menu />
        </IconTrigger>
      </Grid>

      <ElonMusk isOpen={menuIsOpen} onClick={onMenuClose} />
      <MenuContent isOpen={menuIsOpen}>
        <Header>
          <CloseButton>
            <X onClick={onMenuClose} />
          </CloseButton>
        </Header>
        <ContentMenu>
          <MenuList>
            {results.map((item, index) => {
              const name = translateData(item, 'name')
              const id = item.id
              return (
                <NextLink href={sprintf(CATEGORY_ITEM_URL, id)} key={id}>
                  <MenuItem>
                    <span>{name}</span>
                    <ChevronRight size={20} />
                  </MenuItem>
                </NextLink>
              )
            })}
            <Actions>
              {/* <GridActions> */}
              {/*   <Heart /> */}
              {/*   <span>Избранное</span> */}
              {/* </GridActions> */}
              <NextLink href={'/cart'}>
                <GridActions>
                  <BasketUi />
                  <span>Корзина</span>
                </GridActions>
              </NextLink>
            </Actions>
          </MenuList>
          <Socials>
            <SocialItems withText={true} />
          </Socials>
          <Languages />
        </ContentMenu>
      </MenuContent>
    </Wrapper>
  )
}

export default MobileMenu
