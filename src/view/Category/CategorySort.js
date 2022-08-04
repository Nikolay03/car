import React, { useState } from 'react'
import styled from 'styled-components'
import { find, propEq, propOr } from 'ramda'

import { PRICE_TYPES } from '~/constants/constants'
import UniversalStaticSelectField from '~/components/elements/Form/select/UniversalStaticSelectField'

const Wrapper = styled.div`
  * {
    font-weight: 500 !important;
  }
`

const CategorySort = ({ onChangeFilter, initialValues }) => {
  const initialValue = find(propEq('id', propOr('min', 'price', initialValues)))(PRICE_TYPES)
  const [value, setValue] = useState(initialValue)

  return (
    <Wrapper>
      <UniversalStaticSelectField
        isSearchable={false}
        components={{
          IndicatorSeparator: () => null,
          ClearIndicator: () => null
        }}
        typeSelect={'simple'}
        input={{
          onChange: (val) => {
            const id = val?.id || val
            setValue(id)
            onChangeFilter({ price: id })
          },
          value: value
        }}
        list={PRICE_TYPES}
      />
    </Wrapper>
  )
}

export default CategorySort
