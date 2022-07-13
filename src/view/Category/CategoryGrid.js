import React from 'react'
import styled from 'styled-components'

import Filter from '~/view/Category/Filter'
import useRequest from '~/hooks/api/useRequest'
import withFilter from '~/hooks/withFilter'
import TypesSection from '~/view/Category/TypesSection'
import PageTitle from '~/components/elements/PageTitle'
import { useCategoryData } from '~/view/Category/CategoryProvider'

const FilterSide = styled.div`
 max-width: 200px;
`

const CategoryGrid = () => {
  const { productData, api } = useCategoryData()
  const { results, count, isLoading } = useRequest(api, {
    initialData: productData
  })

  const filterActions = withFilter({ fields: ['ordering'] })

  return (
    <>
      <PageTitle>456456</PageTitle>
      <FilterSide>
        <TypesSection />
        <Filter
          {...filterActions}
        />
      </FilterSide>
    </>
  )
}

export default CategoryGrid
