
import React from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'
import { Menu, X } from 'react-feather'

import hexToRgba from '~/utils/hexToRgba'
import { mediaQueries } from '~/constants/mediaQueries'
import menus from '~/constants/menus'
import { phones } from '~/constants/constants'
import { useTranslate } from '~/utils/translate'
import { useAppData } from '~/providers/DataProvider'
import { getListData } from '~/utils/fetch'

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

const IconTrigger = styled('div')`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 4vw;
  & svg {
    fill: ${({ theme }) => theme.color.primary};
  }
  :hover {
    color: ${({ theme }) => theme.color.warning};
    & svg {
      color: ${({ theme }) => theme.color.warning};
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
  padding: 0px 33px 0px 50px;
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
  padding: 0px 10px 40px 40px;
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
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.capital};
  font-weight: 500;
  transition: ${props => props.theme.transition};
  &.active {
    color: ${({ theme }) => theme.color.warning};
  }
  &:hover {
    color: ${({ theme }) => theme.color.warning};
  }
`

const ContentMenu = styled('div')`
  overflow-y: auto;
  min-height: calc(100% - 91px);
  display: flex;
  flex-direction: column;
`

const Connection = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`

const Socials = styled.div`
  display: grid;
  grid-gap: 15px;
  align-self: center;
  grid: 1fr / repeat(3, 1fr);
  margin: 20px 0;
  & svg {
    fill: rgb(93,115,173);
  }
`

const ButtonWrapper = styled.div`
  padding: 0 20px;
  width: 100%;
`

const ConnectionTexts = styled('div')`
  text-align: center;
`
const TelNumber = styled('span')`
  font-size: ${({ theme }) => theme.fontSize.primary};
  font-weight: 600;
  margin-right: 7px;
`
const Hour = styled('span')`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.micro};
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

  // eslint-disable-next-line no-unused-vars
  const { translateData } = useTranslate()
  const { categoryData } = useAppData()
  const {
    // eslint-disable-next-line no-unused-vars
    results
  } = getListData(categoryData)

  const phoneValue = phones[1].value
  const phoneText = phones[1].name
  return (
    <Wrapper>
      <IconTrigger onClick={onMenuOpen}>
        <Menu />
      </IconTrigger>

      <ElonMusk isOpen={menuIsOpen} onClick={onMenuClose} />
      <MenuContent isOpen={menuIsOpen}>
        <Header>
          <CloseButton>
            <X onClick={onMenuClose} />
          </CloseButton>
        </Header>
        <ContentMenu>
          <MenuList>
            {menus.map((item, index) => {
              const url = prop('url', item)
              const label = prop('label', item)
              return (
                <a href={`#${url}`} key={index}>
                  <MenuItem>
                    <span>{label}</span>
                  </MenuItem>
                </a>
              )
            })}
          </MenuList>
          <Connection>
            <ConnectionTexts>
              <TelNumber>
                <a href={`tel:${phoneValue}`}>{phoneText}</a>
              </TelNumber>
              <Hour>
                До 21:00
              </Hour>
            </ConnectionTexts>
            <Socials>
              {/* <SocialItems /> */}
            </Socials>
            <ButtonWrapper>
              {/* <OrderButton fullWidth={true} /> */}
            </ButtonWrapper>
          </Connection>
        </ContentMenu>
      </MenuContent>
    </Wrapper>
  )
}

export default MobileMenu
