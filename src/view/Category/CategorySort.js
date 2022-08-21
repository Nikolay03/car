import React from 'react'
import styled from 'styled-components'
import { propOr } from 'ramda'

import { PRICE_TYPES } from '~/constants/constants'
import UniversalStaticSelectField from '~/components/elements/Form/select/UniversalStaticSelectField'

const Wrapper = styled.div`
  * {
    font-weight: 500 !important;
  }
`

const CategorySort = ({ onChangeFilter, initialValues }) => {
  const initialValue = propOr(null, 'ordering', initialValues)
  return (
    <Wrapper>
      <UniversalStaticSelectField
        isSearchable={false}
        components={{
          IndicatorSeparator: () => null,
          ClearIndicator: () => null
        }}
        placeholder={'Сортировка'}
        typeSelect={'simple'}
        input={{
          onChange: (val) => {
            const id = val?.id || val
            onChangeFilter({ ordering: id })
          },
          value: { id: initialValue }
        }}
        list={PRICE_TYPES}
      />
    </Wrapper>
  )
}

export default CategorySort
