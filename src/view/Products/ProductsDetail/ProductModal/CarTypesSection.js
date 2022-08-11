import React from 'react'
import styled from 'styled-components'
import { includes, pipe, pluck, prop } from 'ramda'

import { useCategoryData } from '~/view/Category/CategoryProvider'
import { getListData } from '~/utils/fetch'
import Accordion from '~/components/Accordion'
import BorderBlock from '~/components/elements/BorderBlock'
import CategoryBlock from '~/view/Category/CategoryBlock'

const AutoSize = styled.div`
  display: grid;
  margin-top: 10px;
  grid-gap: 8px;
  margin-bottom: 16px;
  grid-template-columns: repeat(auto-fill, minmax(123px, 1fr));
`

const CategoryBlockStyled = styled(CategoryBlock)`
  padding-bottom: 14px;
  margin-bottom: 14px;
  &:last-child {
    border-bottom: none;
  }
`

const CarTypesSection = ({
  initialValues,
  onChangeFilter
}) => {
  const { productCategoryData } = useCategoryData()
  const {
    results
  } = getListData(productCategoryData)
  const initialValue = prop('carType', initialValues)
  return (
    <>
      {results.map(i => {
        const id = i.id
        const name = i.name
        const children = i.children
        const hasIn = pipe(
          pluck('id'),
          includes(Number(initialValue))
        )(children)
        return (
          <CategoryBlockStyled key={id}>
            <Accordion title={name} array={children} initialValue={hasIn}>
              <AutoSize>
                {children.map(child => {
                  const idCh = child.id
                  const isActive = Number(initialValue) === idCh
                  return (
                    <BorderBlock
                      isActive={isActive}
                      onClick={() => onChangeFilter({ carType: idCh })}
                      key={idCh}
                      name={child.name}
                    />
                  )
                })}
              </AutoSize>
            </Accordion>
          </CategoryBlockStyled>
        )
      })}
    </>
  )
}

export default CarTypesSection
