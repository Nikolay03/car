import { map, mapObjIndexed, propOr } from 'ramda'
import { useRouter } from 'next/router'

import { appendParamsToQuery, getInitValuesFromHistory } from '~/utils/url'

const getVal = value => propOr(value, 'id', value)
const getIds = map(getVal)

const withFilter = (params) => {
  const { fields, mapValues = getIds, mapInitValues = mapObjIndexed(value => value) } = params
  const router = useRouter()
  const onChange = values => {
    return appendParamsToQuery({ ...mapValues(values) }, router)
  }
  return {
    onChangeFilter: onChange,
    initialValues: mapInitValues(getInitValuesFromHistory(fields, router))
  }
}

export default withFilter
