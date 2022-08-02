import React from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'

import { useCategoryData } from '~/view/Category/CategoryProvider'
import { getListData } from '~/utils/fetch'
import { useTranslate } from '~/utils/translate'
import Accordion from '~/components/Accordion'

const SimpleGrid = styled.div`
  margin-top: 18px;
  padding: 0px 5px;
  display: grid;
  grid-gap: 26px 26px;
  grid-template-columns: repeat( auto-fit, minmax(41px, 41px) )
`

const Color = styled.div`
  border-radius: 100%;
  border: 1px solid ${props => props.isWhite ? '#D7D7D7' : 'transparent'};
  cursor: pointer;
  width: 26px;
  height: 26px;
`

const ColorContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & span {
    margin-top: 5px;
    font-size: 12px;
    font-weight: ${({ isActive }) => isActive && '600'}
  }
`
const ColorsGrid = ({
  initialValues,
  onChangeFilter
}) => {
  const { translateData } = useTranslate()
  const { productColorData } = useCategoryData()
  const {
    results
  } = getListData(productColorData)
  const initialValue = prop('color', initialValues)
  return (
    <Accordion title={'Цвет'} array={results} initialValue={true}>
      <SimpleGrid>
        {results.map(i => {
          const id = i.id
          const name = translateData(i, 'name')
          const isActive = Number(initialValue) === id
          return (
            <ColorContent key={id} isActive={isActive} >
              <Color
                isWhite={i.hex.toLowerCase() === '#ffffff'}
                style={{ backgroundColor: i.hex }}
                onClick={() => onChangeFilter({ color: isActive ? null : id })} />
              <span>{name}</span>
            </ColorContent>
          )
        })}
      </SimpleGrid>
    </Accordion>
  )
}

export default ColorsGrid
