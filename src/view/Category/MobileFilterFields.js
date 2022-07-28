import React from 'react'
import { prop } from 'ramda'

import { useCategoryData } from '~/view/Category/CategoryProvider'
import { getListData } from '~/utils/fetch'
import { useTranslate } from '~/utils/translate'
import FieldWrapper from '~/components/elements/Form/FieldWrapper'
import UniversalStaticSelectField from '~/components/elements/Form/select/UniversalStaticSelectField'
import Filter from '~/view/Category/Filter'

const MobileFilterFields = ({
  initialValues,
  onChangeFilter
}) => {
  const { t } = useTranslate()

  const { productCategoryData, productColorData } = useCategoryData()
  const {
    results: categoryResults
  } = getListData(productCategoryData)

  const {
    results: colorResults
  } = getListData(productColorData)

  const initialCar = Number(prop('car', initialValues)) || { id: null }
  const initialCarType = Number(prop('carType', initialValues)) || { id: null }
  const initialColor = Number(prop('color', initialValues)) || { id: null }
  return (
    <div>
      <FieldWrapper>
        <UniversalStaticSelectField
          input={{
            onChange: (val) => {
              const id = val.id || val
              onChangeFilter({ carType: id, car: null })
            },
            value: initialCarType
          }}
          label={'Категория'}
          placeholder={t('input_select_placeholder')}
          list={categoryResults}
        />
      </FieldWrapper>
      {categoryResults.map(i => {
        const id = i.id
        const isActive = i.id === initialCarType
        const children = i.children
        return isActive && (
          <FieldWrapper key={id}>
            <UniversalStaticSelectField
              input={{
                onChange: (val) => {
                  const id = val.id || val
                  onChangeFilter({ car: id })
                },
                value: initialCar
              }}
              label={'Модель'}
              placeholder={t('input_select_placeholder')}
              list={children}
            />
          </FieldWrapper>
        )
      })}
      <FieldWrapper>
        <UniversalStaticSelectField
          input={{
            onChange: (val) => {
              const id = val.id || val
              onChangeFilter({ color: id })
            },
            value: initialColor
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
