import { useQueryClient } from 'react-query'
import useAuthMutation from './use-auth-mutation-hook'
import { getStorageItem } from '../helpers/utils'
import { removeItemFromStorage } from '../helpers/utils'

const { item } = getStorageItem('user')

const token = `Bearer ${item.Authorization}`
const headers = new Headers()
headers.append('Authorization', token)

const logoutUser = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URI}/auth/logout`,
    {
      method: 'POST',
      headers: headers,
    }
  )
  const data = response.json()
  const status = response.status
  console.log('responses data', data)
  console.log('status', status)
  return response
}

export default function useLogout() {
  const currentClient = useQueryClient()
  return useAuthMutation(logoutUser, {
    onSuccess() {
      removeItemFromStorage('user')
      currentClient.invalidateQueries('user')
    },
  })
}
