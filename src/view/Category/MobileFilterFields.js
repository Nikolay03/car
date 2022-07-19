import React from 'react'
import { filter, map, pipe, prop, propOr, split } from 'ramda'

import UniversalStaticSelectField from '~/components/elements/select/UniversalStaticSelectField'
import { useCategoryData } from '~/view/Category/CategoryProvider'
import { getListData } from '~/utils/fetch'
import { useTranslate } from '~/utils/translate'
import FilterSection from '~/view/Category/FilterSection'
import CategoryBlock from '~/view/Category/CategoryBlock'
import FieldWrapper from '~/components/elements/FieldWrapper'
import { AccordionTitle } from '~/components/Accordion'

const emptyStr = ''

const getIds = (data, key) => pipe(
  propOr(emptyStr, key),
  split('-'),
  filter(Boolean),
  map(Number)
)(data)
const MobileFilterFields = ({
  initialValues,
  onChangeFilter
}) => {
  const { t, translateData } = useTranslate()

  const { productCategoryData, productColorData, categoryData } = useCategoryData()
  const {
    results: categoryResults
  } = getListData(productCategoryData)

  const {
    results: colorResults
  } = getListData(productColorData)

  const filters = prop('children', categoryData) || prop('results', categoryData)

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
      {filters.map((item, key) => {
        const id = item.id
        const name = translateData(item, 'name')
        const children = item.children
        const isLast = filters.length === key + 1
        const queryKey = 'category'
        const countryIds = getIds(initialValues, queryKey)
        return (
          <CategoryBlock key={id} isLast={isLast}>
            <FilterSection
              label={name}
              queryName={queryKey}
              ids={countryIds}
              list={children.map(i => ({ name: translateData(i, 'name'), id: i.id }))}
              onChange={(queryName, ids) => {
                const selectedIds = ids.join('-')
                onChangeFilter({ [queryName]: selectedIds })
              }}
            />
          </CategoryBlock>
        )
      })}
    </div>
  )
}

export default MobileFilterFields
