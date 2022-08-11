import React, { useState } from 'react'
import { Field } from 'react-final-form'
import styled from 'styled-components'
import { Check } from 'react-feather'

import TextField from '~/components/elements/Form/TextField'
import { phoneNumberParse, withoutSpaceParse } from '~/utils/fieldParsers'
import { validatePhoneNumber } from '~/utils/form'
import { mediaQueries } from '~/constants/mediaQueries'
import Button from '~/components/elements/Buttons/Button'
import OrderAuthModal from '~/components/order/OrderAuthConfirm/OrderAuthModal/OrderAuthModal'
import { useAuth } from '~/providers/AuthProvider'

const SimpleGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid: 1fr / 1fr 1fr;
  @media ${mediaQueries.laptopS} {
    grid: 1fr / 1fr;
  }
`

const GridCheck = styled.div`
  display: grid;
  padding: 7px;
  align-self: center;
  justify-content: center;
  border-radius: 100%;
  background: ${({ theme }) => theme.color.primary};
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const ChangeAddress = styled.div`
  position: relative;
  text-align: right;
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

const OrderAuthConfirm = ({ values }) => {
  const { onAuth, isAuth, onLogout } = useAuth()

  const clientPhone = values?.clientPhone
  const [open, setOpen] = useState(false)
  const onOpenToggle = () => setOpen(!open)
  const handleSubmitSMS = () => {
    setOpen(true)
    onAuth({ username: clientPhone })
  }

  const verifyBlock = isAuth
    ? (
      <GridCheck>
        <Check color={'#fff'} size={14} />
      </GridCheck>
    )
    : (
      <Button
        disabled={values?.clientPhone?.length !== 13}
        type={'button'}
        onClick={handleSubmitSMS}
      >
        Подтвердить
      </Button>
    )
  return (
    <>
      <Flex>
        <Title>Контактные данные</Title>
        {isAuth && <ChangeAddress onClick={onLogout}>Изменить номер телефона</ChangeAddress>}
      </Flex>
      <SimpleGrid>
        <Field
          name={'clientName'}
          label={'Имя (Ф.И.О)'}
          component={TextField}
        />
        <Field
          defaultValue={'+998'}
          name={'clientPhone'}
          label={'Номер телефона'}
          component={TextField}
          type={'tel'}
          disabled={isAuth}
          suffix={verifyBlock}
          format={phoneNumberParse}
          parse={withoutSpaceParse}
          validate={value => {
            if (!value) return null
            return validatePhoneNumber(value)
          }}
        />
      </SimpleGrid>
      <OrderAuthModal
        open={open}
        onToggle={onOpenToggle}
        values={values}
      />
    </>
  )
}

export default OrderAuthConfirm
