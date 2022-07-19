import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Filter, Filter as FilterIcon, X as CloseIcon } from 'react-feather'
import PropTypes from 'prop-types'
import { filter, isEmpty } from 'ramda'
import { Portal } from 'react-portal'

import FabButton from '~/components/elements/FabButton'
import { mediaQueries } from '~/constants/mediaQueries'

const WithIcon = styled('div')`
  display: flex;
  align-items: center;
  & > :first-child {
    margin-right: 11px;
  }
  & > :last-child {
    color: #000000;
    font-weight: 600;
    font-size: 17px;
  }
`
const Icon = styled('span')`
  background: ${({ theme, iconBackground }) => iconBackground || theme.palette.blue};
  border-radius: 8px;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  svg{
    margin-top: 5px;
    max-width: 24px;
    max-height: 24px;
  }
`
const MenuContent = styled('div')`
  background: #fff;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.05);
  display: flex;
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transform: translateY(${({ isOpen }) => isOpen ? '0' : '20px'});
  z-index: 1000;
  transition: ${({ theme }) => theme.transition.primary};
`
const Title = styled('div')`
  font-weight: 500;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  min-height: 72px;
  padding: 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #e4e4e6;
`
const MenuList = styled('div')`
  flex-grow: 1;
  overflow: auto;
  padding: 12px 12px 0 12px;
  //margin: 0 0 75px;
  box-shadow: inset 0 -10px 9px -12px #c8c8c857;
  & > form > div {
    overflow-y: auto;
    height: calc(100vh - 160px);
  }
`
const IconWrap = styled('span')`
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  display: none;
  @media ${mediaQueries.tabletL} {
    display: flex;
  }
`
const Dot = styled('span')`
  display: ${({ isActive }) => isActive ? 'block' : 'none'};
  position: absolute;
  left: -8px;
  top: 50%;
  border-radius: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.palette.red};
`

const FiltersBar = props => {
  const {
    children,
    isOpen,
    setOpen,
    withOutButton,
    initialValues
  } = props

  // Redirects
  const filteredInitialValues = initialValues && filter(item => !!item, initialValues)
  const isActive = filteredInitialValues && !isEmpty(filteredInitialValues)

  // Switch functions
  const onMenuOpen = () => setOpen(true)
  const onMenuClose = () => setOpen(false)

  // useEffect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style = null
    }
  }, [isOpen])
  // Render
  return (
    <>
      {!withOutButton &&
      <IconWrap>
        <Dot
          isActive={isActive}
        />
        <FilterIcon
          color={'#000'}
          size={24}
          onClick={onMenuOpen}
        />
      </IconWrap>}
      {isOpen && <Portal>
        <MenuContent
          isOpen={isOpen}
        >
          <Title>
            <WithIcon>
              <Icon>
                <Filter color={'#fff'} />
              </Icon>
              <span>Фильтр</span>
            </WithIcon>
            <FabButton onClick={onMenuClose}>
              <CloseIcon size={18} color={'rgba(60, 60, 67, 0.6)'} />
            </FabButton>
          </Title>
          <MenuList>
            {children}
          </MenuList>
        </MenuContent>
      </Portal>}
    </>
  )
}

FiltersBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  initialValues: PropTypes.object
}

export default FiltersBar
