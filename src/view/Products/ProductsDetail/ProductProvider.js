import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const ProductContext = createContext(null)

function ProductProvider (props) {
  const { children, ...restProps } = props
  return (
    <ProductContext.Provider value={restProps}>
      {children}
    </ProductContext.Provider>
  )
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useProductData () {
  return useContext(ProductContext)
}

export default ProductProvider
