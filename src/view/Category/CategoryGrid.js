import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'ramda'

import Filter from '~/view/Category/Filter'
import useRequest from '~/hooks/api/useRequest'
import withFilter from '~/hooks/withFilter'
import TypesSection from '~/view/Category/TypesSection'
import PageTitle from '~/components/elements/PageTitle'
import { useCategoryData } from '~/view/Category/CategoryProvider'
import ColorsGrid from '~/components/Colors/ColorsGrid'
import CategoryBlock from '~/view/Category/CategoryBlock'
import { useTranslate } from '~/utils/translate'
import CategorySort from '~/view/Category/CategorySort'
import ProductCard from '~/components/ProductCard'
import Skelet from '~/components/Skelet'

const Content = styled.div`
  display: grid;
  grid: 1fr / min-content 1fr;
  grid-gap: 35px;
`

const ProductsSide = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
`

const FilterSide = styled.div`
 min-width: 200px;
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3.1em 0px;
`
const EmptyProducts = styled('div')`
  margin: 20px 0 0;
  background: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 20px;
  width: 100%;
`

const CategoryGrid = ({ productDataList }) => {
  const { t, translateData } = useTranslate()
  const { categoryData } = useCategoryData()
  const { results, isLoading } = productDataList
  const name = translateData(categoryData, 'name')
  const filterActions = withFilter({ fields: ['price', 'color', 'car', 'category'] })

  return (
    <>
      <PageHeader>
        <PageTitle>{name}</PageTitle>
        <CategorySort {...filterActions} />
      </PageHeader>
      <Content>
        <FilterSide>
          <CategoryBlock>
            <TypesSection
              {...filterActions}
            />
          </CategoryBlock>
          <CategoryBlock>
            <ColorsGrid
              {...filterActions}
            />
          </CategoryBlock>
          <Filter
            {...filterActions}
          />
        </FilterSide>
        {isLoading
          ? <Skelet count={9} col={3} />
          : isEmpty(results)
            ? (
              <EmptyProducts>Продукты не найдены</EmptyProducts>
            )
            : (
              <ProductsSide>
                {results.map((item) => {
                  const id = item?.id
                  return (
                    <ProductCard key={id} data={item} priceBottom={true} />
                  )
                })}
              </ProductsSide>
            )
        }
      </Content>
    </>
  )
}

export default CategoryGrid
