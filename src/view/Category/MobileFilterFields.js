import React from 'react'
import { propOr } from 'ramda'

import { useCategoryData } from '~/view/Category/CategoryProvider'
import { getListData } from '~/utils/fetch'
import { useTranslate } from '~/utils/translate'
import FieldWrapper from '~/components/elements/Form/FieldWrapper'
import UniversalStaticSelectField from '~/components/elements/Form/select/UniversalStaticSelectField'
import Filter from '~/view/Category/Filter'
import { PRICE_TYPES } from '~/constants/constants'

const MobileFilterFields = ({
  initialValues,
  onChangeFilter
}) => {
  const { t } = useTranslate()

  const { productColorData } = useCategoryData()

  const {
    results: colorResults
  } = getListData(productColorData)

  const initialColor = Number(propOr(null, 'color', initialValues))
  const initialOrdering = propOr(null, 'ordering', initialValues)
  return (
    <div>
      <FieldWrapper>
        <UniversalStaticSelectField
          input={{
            onChange: (val) => {
              const id = val?.id || val
              onChangeFilter({ ordering: id })
            },
            value: { id: initialOrdering }
          }}
          label={'Сортировка'}
          placeholder={t('input_select_placeholder')}
          list={PRICE_TYPES}
        />
      </FieldWrapper>
      <FieldWrapper>
        <UniversalStaticSelectField
          input={{
            onChange: (val) => {
              const id = val?.id || val
              onChangeFilter({ color: id })
            },
            value: { id: initialColor || null }
          }}
          label={'Цвета'}
          placeholder={t('input_select_placeholder')}
          list={colorResults}
        />
      </FieldWrapper>
      <Filter
        initialValues={initialValues}
        onChangeFilter={onChangeFilter}
      />
    </div>
  )
}

export default MobileFilterFields
