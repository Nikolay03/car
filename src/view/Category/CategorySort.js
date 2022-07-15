import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { find, not, pipe, prop, propEq, propOr } from 'ramda'
import { ChevronLeft, Globe } from 'react-feather'
import { CircleFlag } from 'react-circle-flags'

import { setLocale } from '~/utils/cookies'
import { PRICE_TYPES } from '~/constants/constants'

function StyledCircleFlag (props) {
  return (
    <CircleFlag
      height={'15'}
      width={'15'}
      {...props}
    />
  )
}

const Wrapper = styled.div`
  position: relative;
  & .open {
    & svg {
      transform: rotate(270deg);
    }
  }
`

const LanguageButton = styled.div`
  cursor: pointer;
  min-width: 103px;
  display: grid;
  grid: 1fr / min-content min-content;
  align-items: center;
  white-space: nowrap;
  grid-gap: 9px;
  & svg {
    transform: rotate(90deg);
  };
`

const MenuList = styled.div`
  background-color: white;
  position: absolute;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 8px;
  display: grid;
  grid-gap: 10px;
`

const MenuItem = styled.div`
  position: relative;
  white-space: nowrap;
`

const CategorySort = ({ onChangeFilter, initialValues }) => {
  const [open, setOpen] = useState(false)
  const initialValue = find(propEq('id', propOr('min', 'price', initialValues)))(PRICE_TYPES)

  return (
    <Wrapper>
      <LanguageButton
        onClick={() => setOpen(!open)}
        className={open ? 'open' : ''}
      >
        <span>По цене ({initialValue.name})</span>
        <ChevronLeft size={16} />
      </LanguageButton>
      {open && (
        <MenuList>
          {PRICE_TYPES.map(item => (
            <MenuItem
              key={item.id}
              aria-label={`Change locale to ${item.id}`}
              onClick={() => {
                onChangeFilter({ price: item.id })
              }}>
              {item.name}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Wrapper>
  )
}

export default CategorySort
