import { useQuery } from 'react-query'
import {
  removeItemFromStorage,
  getStorageItemWithExpiry,
} from '../helpers/utils'

const useAuthedQuery = (
  queryName: string,
  queryFunction: () => any,
  ...options: any
) => {
  const query = useQuery(queryName, queryFunction, options)
  console.log('query', query)
  const error: any = query?.error
  console.log('error', error)

  if (error?.status === 401 || error?.status === 403) {
    // Insert custom access-token refresh logic here. For now, we are
    // remove tokens from local storage
    const item = getStorageItemWithExpiry('user')
    item && removeItemFromStorage('user')
    // just refreshing the page here, so as to redirect them to the
    // login page since their token is now expired
    window.location.reload()
  }
  return query
}

export default useAuthedQuery
