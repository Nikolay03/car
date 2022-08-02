import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { not, pipe, propEq } from 'ramda'
import { Globe } from 'react-feather'
import { CircleFlag } from 'react-circle-flags'

import { setLocale } from '~/utils/cookies'
import { mediaQueries } from '~/constants/mediaQueries'

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
  display: block;
  @media ${mediaQueries.laptopS} {
    display: none;
  }
`

const MobileWrapper = styled.div`
  padding: 0px 15px 0px 40px;
  display: none;
  @media ${mediaQueries.laptopS} {
    display: flex;
  }
`

const MobileBtn = styled.div`
  border-radius: 48px;
  cursor: pointer;
  padding: 5px 22px;
  border: 1px solid ${({ theme, isActive }) => isActive ? theme.color.primary : 'transparent'};
`

const LanguageButton = styled.div`
  cursor: pointer;
  min-width: 103px;
  display: grid;
  grid: 1fr / min-content min-content;
  align-items: center;
  grid-gap: 9px;
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
  display: grid;
  align-items: center;
  grid: 1fr / 15px min-content;
  grid-gap: 15px;
`

const languages = [
  {
    id: 'uz',
    name: 'O\'zbekcha',
    shortName: 'O\'zb',
    flag: <StyledCircleFlag countryCode={'uz'} />
  },
  {
    id: 'ru',
    name: 'Русский',
    shortName: 'Рус',
    flag: <StyledCircleFlag countryCode={'ru'} />
  },
  {
    id: 'en',
    name: 'English',
    shortName: 'Eng',
    flag: <StyledCircleFlag countryCode={'us'} />
  }
]
const Languages = props => {
  const [open, setOpen] = useState(false)

  const { locale, pathname, query, ...router } = useRouter()

  const filteredLanguages = languages.filter(pipe(propEq('id', locale), not))
  const currentLocaleObj = languages.find(propEq('id', locale))

  function onChangeLocale (locale) {
    return router.replace({ pathname, query }, null, { locale, shallow: true })
      .then(() => {
        setOpen(false)
        setLocale(locale)
      })
  }
  return (
    <>
      <Wrapper>
        <LanguageButton onClick={() => setOpen(!open)}>
          <Globe /> {currentLocaleObj.name}
        </LanguageButton>
        {open && (
          <MenuList>
            {filteredLanguages.map(item => (
              <MenuItem
                key={item.id}
                aria-label={`Change locale to ${item.id}`}
                onClick={onChangeLocale.bind(null, item.id)}>
                {item.flag} {item.name}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </Wrapper>
      <MobileWrapper>
        {languages.map(item => {
          const isActive = item.id === locale
          return (
            <MobileBtn
              onClick={onChangeLocale.bind(null, item.id)}
              isActive={isActive}
              key={item.id}
            >
              {item.shortName}
            </MobileBtn>
          )
        })}
      </MobileWrapper>
    </>
  )
}

export default Languages
