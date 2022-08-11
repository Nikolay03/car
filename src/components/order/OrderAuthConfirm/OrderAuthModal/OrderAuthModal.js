import React from 'react'
import styled from 'styled-components'
import { Field } from 'react-final-form'
import { useToasts } from 'react-toast-notifications'

import Modal from '~/components/Modal'
import { useAuth } from '~/providers/AuthProvider'
import TextField from '~/components/elements/Form/TextField'
import Preloader from '~/components/PreLoader/Preloader'
import Timer from '~/view/sign-in/components/Timer'
import FieldWrapper from '~/components/elements/Form/FieldWrapper'
import Button from '~/components/elements/Buttons/Button'

const Container = styled.div`
  margin: 0 auto;
  width: 170px;
  display: grid;
  justify-items: center;
`

const LoadingWrap = styled.div`

`
const ButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: end;
`

const OrderAuthModal = ({ open, onToggle, values }) => {
  const { onAuth, onLogin, isLoading, isUserLoading } = useAuth()
  const { addToast } = useToasts()

  const clientPhone = values?.clientPhone
  const code = values?.code

  const handleLogin = () => {
    return onLogin({
      code: code,
      username: clientPhone
    }).then(() => {
      addToast('Успешно подтвержденно', { appearance: 'success' })
      onToggle()
    }).catch(_ => {
      return addToast('Ошибка', { appearance: 'error' })
    })
  }

  return (
    <Modal
      open={open}
      width={'400px'}
      onClose={onToggle}
      title={'Код из СМС'}
      subTitle={`Мы отправили СМС с кодом на номер ${clientPhone}`}
      showHeader={true}
      showCloseIcon={false}
    >
      <Container>
        {isLoading
          ? (
            <LoadingWrap>
              <Preloader />
            </LoadingWrap>
          )
          : (
            <>
              <FieldWrapper>
                <Field
                  component={TextField}
                  name={'code'}
                  type={'text'}
                  label={'Код из SMS'}
                  fullWidth={true}
                  maxLength={6}
                  disabled={isLoading}
                />
              </FieldWrapper>
              <Timer
                time={60}
                onAfterClick={() => onAuth({ username: clientPhone })}
              />
              <ButtonWrapper>
                <Button
                  themeType={'dark'}
                  type={'button'}
                  fullWidth={true}
                  onClick={handleLogin}
                  disabled={isLoading || isUserLoading}
                  loading={isLoading || isUserLoading}
                >Отправить</Button>
              </ButtonWrapper>
            </>
          )}
      </Container>
    </Modal>
  )
}

OrderAuthModal.propTypes = {

}

export default OrderAuthModal
