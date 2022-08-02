import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types'

import Fields from '~/components/elements/Form/Fields'
import YandexMapField from '~/components/elements/Map/YandexMapField'
import TextField from '~/components/elements/Form/TextField'
import { phoneNumberParse, withoutSpaceParse } from '~/utils/fieldParsers'
import { validatePhoneNumber } from '~/utils/form'
import OrderSelectField from '~/components/elements/Form/OrderSelectField'
import Button from '~/components/elements/Buttons/Button'
import { mediaQueries } from '~/constants/mediaQueries'
import { useTranslate } from '~/utils/translate'

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

const SimpleGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid: 1fr / 1fr 1fr;
  @media ${mediaQueries.laptopS} {
    grid: 1fr / 1fr;
  }
`

const Order = props => {
  const {
    onSubmit,
    deliveryTypesResults,
    initialValues
  } = props

  const { translateData } = useTranslate()

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => {
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
                <RowUI gutter={20}>
                  <SimpleGrid>
                    <Field
                      defaultValue={'+998'}
                      name={'clientPhone'}
                      disabled={true}
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
                    <Field
                      name={'clientName'}
                      label={'Имя (Ф.И.О)'}
                      component={TextField}
                    />
                  </SimpleGrid>
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
                      return <YandexMapField fields={fields} />
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
    </>
  )
}

Order.propTypes = {
  products: PropTypes.array
}

export default Order
