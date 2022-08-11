import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types'

import Fields from '~/components/elements/Form/Fields'
import YandexMapField from '~/components/elements/Map/YandexMapField'
import OrderSelectField from '~/components/elements/Form/OrderSelectField'
import Button from '~/components/elements/Buttons/Button'
import { useTranslate } from '~/utils/translate'
import OrderAuthConfirm from '~/components/order/OrderAuthConfirm/OrderAuthConfirm'
import { useAuth } from '~/providers/AuthProvider'

const Row = styled.div``
const AddressInfo = styled.div`
`
const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.capitalTwo};
  color: ${({ theme }) => theme.color.primaryGray};
  line-height: 164.57%;
  margin: 15px 0;
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
const Line = styled.div`
  border-bottom: 1px solid #eaeaec;
  margin: 45px 0;
`
const ButtonWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: end;
`
const MaxWidth = styled.div`
`
const RowUI = styled(Row)`
  margin-top: 20px;
`

const Order = props => {
  const {
    onSubmit,
    orderCreate,
    deliveryTypesResults,
    initialValues
  } = props
  const { translateData } = useTranslate()
  const { isAuth } = useAuth()

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, values, form }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MaxWidth>
              <RowUI>
                <Title>Способ доставки</Title>
                <AddressInfo>
                  <Field
                    name={'deliveryType'}
                    component={OrderSelectField}
                    dataProps={deliveryTypesResults.map(item => ({ id: item.id, name: translateData(item, 'name') }))}
                  />
                </AddressInfo>
              </RowUI>
              <Line />
              <RowUI>
                <OrderAuthConfirm
                  values={values}
                />
              </RowUI>
              <Line />
              <AddressInfo>
                <Fields
                  names={[
                    'address.location',
                    'address.address',
                    'address.referencePoint'
                  ]}
                >
                  {(fields) => {
                    return <YandexMapField form={form} fields={fields} />
                  }}
                </Fields>
              </AddressInfo>
              <Line />
              <RowUI>
                <Title>Способ оплаты</Title>
                <AddressInfo>
                  <Field
                    name={'paymentType'}
                    component={OrderSelectField}
                    dataProps={[{ id: 'cash', name: 'Наличные' }]}
                  />
                </AddressInfo>
              </RowUI>

              <ButtonWrapper>
                <Button
                  styles={{ minWidth: '300px' }}
                  themeType={'dark'}
                  loading={orderCreate.isLoading}
                  disabled={orderCreate.isLoading || !isAuth}
                  type={'submit'}
                >
                    Оформить заказ
                </Button>
              </ButtonWrapper>
            </MaxWidth>
          </form>
        )
      }}
    />
  )
}

Order.propTypes = {
  products: PropTypes.array
}

export default Order
