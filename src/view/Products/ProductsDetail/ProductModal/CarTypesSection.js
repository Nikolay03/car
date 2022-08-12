import React from 'react'
import styled from 'styled-components'
import { includes, pipe, pluck, prop } from 'ramda'

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
  onChangeFilter,
  groupCarTypes
}) => {
  const initialValue = prop('carType', initialValues)
  return (
    <>
      {groupCarTypes.map((i, key) => {
        const [title, children] = i
        const hasIn = pipe(
          pluck('id'),
          includes(Number(initialValue))
        )(children)
        return (
          <CategoryBlockStyled key={key}>
            <Accordion title={title} array={children} initialValue={hasIn}>
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
