import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MapPin } from 'react-feather'
import { path } from 'ramda'

import TextField from '~/components/elements/Form/TextField'
import Button from '~/components/elements/Buttons/Button'
import { mediaQueries } from '~/constants/mediaQueries'

const LocationBlock = styled.div`
  display: grid;
  min-width: 160px;
  align-items: center;
  grid: 1fr / min-content 1fr;
  grid-gap: 7px;
`
const LocationText = styled.div`
  font-weight: 500;
  font-size: 16px;
`
const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSize.capitalTwo};
  line-height: 164.57%;
  color: ${({ theme }) => theme.color.primaryGray};
  margin: 0 0 15px 0;
  &:after{
    content: ${({ suffix }) => suffix ? `"${suffix} *"` : ''};
    display: inline-block;
    color: #818591;
    font-size: 13px;
    font-weight: 400;
    margin-left: 10px;
    position: relative;
    bottom: 8px;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid: 1fr / min-content min-content;
  @media ${mediaQueries.mobileXL} {
    grid: 1fr / 1fr;
    grid-gap: 10px;
  }
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ChangeAddress = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 0 13px 0;
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
  &:hover {
    &:after {
      width: 100%;
    };
  };
`
const AddressField = props => {
  const {
    onIconClick,
    withFloat,
    name,
    label = 'Введите или выберите адрес на карте',
    ...rest
  } = props
  const hasValue = path(['input', 'value'], rest)
  return (
    <div>
      {hasValue
        ? (
          <>
            <Flex>
              <Title>Адрес доставки</Title>
              <ChangeAddress onClick={onIconClick}>Изменить</ChangeAddress>
            </Flex>
            <TextField
              name={name}
              label={label}
              {...rest}
            />
          </>
        )
        : (
          <Wrapper>
            <Title>Адрес доставки</Title>
            <Button themeType={'dark'} onClick={onIconClick} type={'button'}>
              <LocationBlock>
                <MapPin size={16} />
                <LocationText>Указать на карте</LocationText>
              </LocationBlock>
            </Button>
          </Wrapper>
        )}
    </div>

  )
}

AddressField.propTypes = {
  onIconClick: PropTypes.func,
  input: PropTypes.any,
  withFloat: PropTypes.bool
}

export default AddressField
