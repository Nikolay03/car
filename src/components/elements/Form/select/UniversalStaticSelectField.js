import React from 'react'

import SearchField from './SearchField'

import { defaultGetText, defaultGetValue, getStaticOption, getStaticOptions } from '~/utils/searchField'

const UniversalStaticSelectField = props => {
  const { list, itemText } = props
  return (
    <SearchField
      getText={defaultGetText(itemText)}
      getValue={defaultGetValue(['id'])}
      getOptions={search => getStaticOptions(search, list)}
      getOption={id => getStaticOption(id, list)}
      isStatic={true}
      {...props}
    />
  )
}

UniversalStaticSelectField.defaultProps = {
  itemText: ['name']
}

export default UniversalStaticSelectField
