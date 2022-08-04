import React, { useState } from 'react'
import styled from 'styled-components'
import { path } from 'ramda'

import UniversalStaticSelectField from '~/components/elements/Form/select/UniversalStaticSelectField'
import { QUANTITY_LIST } from '~/constants/constants'

const Prefix = styled.span`
  white-space: nowrap;
`

const CartSelect = ({ product, onAdd }) => {
  const amount = path(['amount'], product)
  const [value, setValue] = useState(Number(amount))

  return (
    <UniversalStaticSelectField
      isSearchable={false}
      prefix={<Prefix>Кол-во</Prefix>}
      components={{
        IndicatorSeparator: () => null,
        ClearIndicator: () => null
      }}
      typeSelect={'simple'}
      input={{
        onChange: (val) => {
          const id = val?.id || val
          setValue(id)
          onAdd(product, id)
        },
        value: value
      }}
      list={QUANTITY_LIST}
    />
  )
}

CartSelect.propTypes = {

}

export default CartSelect
