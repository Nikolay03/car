import { useState, useMemo } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import { getListData } from '~/utils/fetch'
import { fetcher } from '~/utils/swr'
import useRouterQuery from '~/hooks/useRouterQuery'

export default function useRequest (api, options) {
  const {
    initialData,
    disableUrlParams,
    disableLocale = true,
    params = {},
    ...restOptions
  } = options

  const { locale: language } = useRouter()

  const { urlQuery } = useRouterQuery()

  const [isLoading, setIsLoading] = useState(false)

  const initialParams = disableLocale ? { ...params } : { ...params, language }
  const allParams = disableUrlParams ? initialParams : { ...urlQuery, ...initialParams }
  const stringParams = JSON.stringify(allParams)

  const memoParams = useMemo(() => allParams, [stringParams])
  const { data, error, isValidating, mutate } = useSWR([api, memoParams], fetcher, {
    fallbackData: initialData,
    revalidateOnFocus: false,
    ...restOptions
  })
  function refetch (newParams, newApi) {
    setIsLoading(true)
    return mutate(async () => await fetcher(newApi || api, newParams), false)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }

  const listData = getListData(data, error)

  return {
    ...listData,
    data,
    refetch,
    isLoading: isValidating || isLoading
  }
}
