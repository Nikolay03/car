import React from 'react'
import styled, { css } from 'styled-components'
import { includes, pipe, pluck, prop } from 'ramda'

import { useCategoryData } from '~/view/Category/CategoryProvider'
import { getListData } from '~/utils/fetch'
import Accordion from '~/components/Accordion'

const Ul = styled.ul`
  list-style: none;
  padding: 0.65em 1em 0px;
`

const Li = styled.li`
  margin-bottom: 9px;
  position: relative;
  &:before {
    content: " ";
    top: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    background-color: ${({ theme }) => theme.background.primary100};
    font-weight: bold;
    border-radius: 100%;
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-left: calc(-1em + 6px);;
  };
  & span {
    cursor: pointer;
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      bottom: -2px;
      left: 0px;
      width: 0%;
      height: 1px;
      background-color: black;
      transform-origin: 0% 100%;
      transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    };
    &:hover {
      font-weight: 600;
      &:after {
        width: 100%;
      };
    };
    ${({ isActive }) => isActive && css`
      font-weight: 600;
      &:after {
        width: 100%;
      };
    `}
  }
`

const TypesSection = ({
  initialValues,
  onChangeFilter
}) => {
  const { productCategoryData } = useCategoryData()
  const {
    results
  } = getListData(productCategoryData)
  const initialValue = prop('car', initialValues)
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
          <Accordion key={id} title={name} array={children} initialValue={hasIn}>
            <Ul>
              {children.map(child => {
                const idCh = child.id
                const isActive = Number(initialValue) === idCh
                return (
                  <Li
                    isActive={isActive}
                    key={idCh}
                    onClick={() => onChangeFilter({ car: idCh })}
                  >
                    <span>{child.name}</span>
                  </Li>
                )
              })}
            </Ul>
          </Accordion>
        )
      })}
    </>
  )
}

export default TypesSection
