import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const searchContext = React.createContext()

export const ContextSearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState([])
  return (
    <searchContext.Provider
      value={{
        search,
        setSearch,
      }}>
      {children}
    </searchContext.Provider>
  )
}

ContextSearchContextProvider.propTypes = {
  children: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.any])
  ).isRequired,
}
