import React, { useState } from 'react'
import styled from 'styled-components'
import { find, flatten, isEmpty, map, pipe, prop, propEq, propOr } from 'ramda'
import { useRouter } from 'next/router'

import Filter from '~/view/Category/Filter'
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
import FiltersBar from '~/components/elements/FiltersBar'
import { mediaQueries } from '~/constants/mediaQueries'
import MobileFilterFields from '~/view/Category/MobileFilterFields'
import { getListData } from '~/utils/fetch'
import Pagination from '~/components/Pagination'
import FieldWrapper from '~/components/elements/Form/FieldWrapper'
import UniversalStaticSelectField from '~/components/elements/Form/select/UniversalStaticSelectField'

const Content = styled.div`
  grid: 1fr / min-content 1fr;
  grid-gap: 35px;
  display: flex;
  @media ${mediaQueries.tabletL} {
    grid: 1fr / 1fr;
    grid-gap: 35px;
  }
`

const ProductsSide = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 60px 0px;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
`

const Pages = styled('div')`
  text-align: center;
  margin-top: 40px;
`

const FilterSide = styled.div`
  min-width: 200px;
  @media ${mediaQueries.tabletL} {
    display: none;
  }
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3.1em 0px;
  @media ${mediaQueries.tabletL} {
    margin: 2.1em 0px;
  }
`

const ForDesctop = styled.div`
  display: flex;
  @media ${mediaQueries.tabletL} {
    display: none;
  }
`

const EmptyProducts = styled('div')`
  margin: 20px 0 0;
  background: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 20px;
  width: 100%;
`

const Mobile = styled.div`
  width: 100%;
  display: none;
  & > div{
    width: 100%;
  };
  @media ${mediaQueries.tabletL} {
    display: block;
  }
`

const CategoryGrid = ({ productDataList }) => {
  const [openFilter, setOpenFilter] = useState(false)

  const { t, translateData } = useTranslate()
  const { categoryData } = useCategoryData()
  const { results, isLoading, count } = productDataList
  const { productCategoryData } = useCategoryData()
  const {
    results: resultsProductCategory
  } = getListData(productCategoryData)
  const { query } = useRouter()
  const carNameTitle = pipe(
    map(i => i.children),
    flatten,
    find(propEq('id', Number(query?.car)))
  )(resultsProductCategory)
  const name = translateData(categoryData, 'name') || t('product_for', { type: prop('name', carNameTitle) })
  const filterActions = withFilter({ fields: ['ordering', 'color', 'car', 'category', 'carType'] })

  const initialCarType = Number(propOr(null, 'carType', filterActions.initialValues))
  const initialCar = Number(propOr(null, 'car', filterActions.initialValues))
  const {
    results: categoryResults
  } = getListData(productCategoryData)
  const filters = (
    <>
      <MobileFilterFields {...filterActions} />
    </>
  )
  return (
    <>
      <PageHeader>
        <PageTitle>{name}</PageTitle>
        <FiltersBar
          initialValues={filterActions.initialValues}
          isOpen={openFilter}
          setOpen={setOpenFilter}
        >
          <div>{filters}</div>
        </FiltersBar>
        <ForDesctop>
          <CategorySort {...filterActions} />
        </ForDesctop>
      </PageHeader>
      <Mobile>
        <>
          <FieldWrapper>
            <UniversalStaticSelectField
              input={{
                onChange: (val) => {
                  const id = val?.id || val
                  filterActions.onChangeFilter({ carType: id, car: null })
                },
                value: { id: initialCarType }
              }}
              label={'Выбирите Тип авто'}
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
                      const id = val?.id || val
                      filterActions.onChangeFilter({ car: id })
                    },
                    value: { id: initialCar }
                  }}
                  label={'Модель'}
                  placeholder={t('input_select_placeholder')}
                  list={children}
                />
              </FieldWrapper>
            )
          })}
        </>
      </Mobile>
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
              <div style={{ width: '100%' }}>
                <ProductsSide>
                  {results.map((item) => {
                    const id = item?.id
                    return (
                      <ProductCard key={id} data={item} priceBottom={true} />
                    )
                  })}
                </ProductsSide>
                <Pages>
                  <Pagination count={count} pageSize={10} />
                </Pages>
              </div>

            )
        }
      </Content>
    </>
  )
}

export default CategoryGrid
