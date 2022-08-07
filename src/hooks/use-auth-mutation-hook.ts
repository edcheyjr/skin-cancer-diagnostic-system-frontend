import {
  removeItemFromStorage,
  getStorageItemWithExpiry,
} from '../helpers/utils'
import { useMutation } from 'react-query'

const useAuthedMutation = (
  mutationFn: () => Promise<Response>,
  callbacksFnObj: object
) => {
  const mutation = useMutation(mutationFn, callbacksFnObj)
  const response = mutation?.data
  if (response?.status === 401 || response?.status === 403) {
    // Insert custom access-token refresh logic here. For now, we are
    // just refreshing the page here, so as to redirect them to the
    // login page since their token is now expired.
    // remove the user details from local storage
    const item = getStorageItemWithExpiry('user')
    item && removeItemFromStorage('user')
    window.location.reload()
  }
  return mutation
}

export default useAuthedMutation
