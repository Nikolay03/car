import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

import TextField from '~/components/elements/Form/TextField'
import Timer from '~/view/sign-in/components/Timer'
import Button from '~/components/elements/Buttons/Button'
import Preloader from '~/components/PreLoader/Preloader'
import useCompareEffect from '~/hooks/useCompareEffect'
import { useAuth } from '~/providers/AuthProvider'
import { phoneNumberParse, withoutSpaceParse } from '~/utils/fieldParsers'
import { mapResponseToFormError, validatePhoneNumber } from '~/utils/form'

const FormWrapper = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  & > *:not(:last-child){
    margin-bottom: 20px;
  }
`
const TimerWrap = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const LoadWrap = styled('div')`
  width: 100%;
  margin: 20px 0;
  & > div{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
`
const TimerText = styled('div')`
  font-size: 14px;
  line-height: 18px;
  color: #818591;
`

const ButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: end;
`

const SignInForm = () => {
  const { onAuth, onLogin, isLoading, isUserLoading } = useAuth()
  // useState
  const [openLogin, setOpenLogin] = useState(false)

  // Const

  // Loader
  const loader =
    <LoadWrap>
      <Preloader />
    </LoadWrap>

  // OnSubmit
  const handleSubmit = (values) => {
    return onLogin({
      code: values.code,
      username: values.username
    }).catch(error => {
      return mapResponseToFormError(error)
    })
  }
  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, values, form }) => {
        useCompareEffect(() => {
          if (values?.username?.length === 13) {
            onAuth({ username: values.username }).then(() => setOpenLogin(true))
          }
        }, [values?.username])

        return (
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <Field
                defaultValue={'+998'}
                name={'username'}
                label={'Номер телефона'}
                component={TextField}
                type={'tel'}
                format={phoneNumberParse}
                parse={withoutSpaceParse}
                validate={value => {
                  if (!value) return null
                  return validatePhoneNumber(value)
                }}
              />
              {openLogin && (
                <>
                  <Field
                    component={TextField}
                    name={'code'}
                    type={'number'}
                    label={'Код из SMS'}
                    fullWidth={true}
                    maxLength={5}
                    disabled={isLoading}
                  />
                  <TimerWrap>
                    <TimerText>Мы отправили SMS с кодом на ваш номер</TimerText>
                    <Timer
                      time={60}
                      onAfterClick={() => onAuth({ username: values.username })}
                    />
                  </TimerWrap>
                  <ButtonWrapper>
                    <Button
                      styles={{ minWidth: '300px' }}
                      themeType={'dark'}
                      type={'button'}
                      onClick={handleSubmit}
                      disabled={isLoading || isUserLoading}
                      loading={isLoading || isUserLoading}
                    >Войти</Button>
                  </ButtonWrapper>
                </>
              )}
              {(isLoading || isUserLoading) && loader}
            </FormWrapper>
          </form>
        )
      }}
    />
  )
}

SignInForm.propTypes = {

}

export default SignInForm
