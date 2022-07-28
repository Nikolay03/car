import React, { useState } from 'react'
import { prop } from 'ramda'
import { Field } from 'react-final-form'
import PropTypes from 'prop-types'

import AddressField from './AddressField'
import YandexMap from './YandexMap'

import FieldWrapper from '~/components/elements/Form/FieldWrapper'

const YandexMapField = props => {
  const { fields } = props

  const [open, setOpen] = useState(false)

  const addressInputs = prop('address.address', fields)
  const locationInputs = prop('address.location', fields)
  const onAddressChange = addressInputs.input.onChange
  const addressValue = addressInputs.input.value
  const onOpenToggle = () => setOpen(!open)
  return (
    <>
      <FieldWrapper>
        <Field
          name={'address.address'}
          component={AddressField}
          onIconClick={onOpenToggle}
        />
      </FieldWrapper>
      <YandexMap
        {...locationInputs}
        onToggle={onOpenToggle}
        open={open}
        addressValue={addressValue}
        onAddressChange={onAddressChange}
      />
    </>
  )
}

YandexMapField.propTypes = {
  fields: PropTypes.object
}

export default YandexMapField
