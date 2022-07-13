
import { split } from 'ramda'
import { useRouter } from 'next/router'

import { searchToQuery } from '~/utils/url'

export default function useRouterQuery () {
  const { asPath, ...router } = useRouter()

  const [, search] = split('?', asPath)
  const query = searchToQuery(search)

  return {
    routerQuery: router.query,
    urlQuery: query
  }
}
