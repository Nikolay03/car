import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const HomeContext = createContext(null)

function HomeProvider (props) {
  const { children, ...restProps } = props

  return (
    <HomeContext.Provider value={restProps}>
      {children}
    </HomeContext.Provider>
  )
}

HomeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useHomeData () {
  return useContext(HomeContext)
}

export default HomeProvider
