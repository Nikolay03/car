import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const DataContext = createContext(null)

export function DataProvider (props) {
  const { children, categoryData } = props

  return (
    <DataContext.Provider value={{ categoryData }}>
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useAppData () {
  return useContext(DataContext)
}
