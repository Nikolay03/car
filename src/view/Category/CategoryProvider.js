import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const CategoryContext = createContext(null)

function CategoryProvider (props) {
  const { children, ...restProps } = props

  return (
    <CategoryContext.Provider value={restProps}>
      {children}
    </CategoryContext.Provider>
  )
}

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useCategoryData () {
  return useContext(CategoryContext)
}

export default CategoryProvider
