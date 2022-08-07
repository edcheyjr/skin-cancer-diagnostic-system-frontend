import { useMutation, useQueryClient } from 'react-query'

interface authUser {
  email: string
  password: string
}
const headers = new Headers({ 'Content-Type': 'application/json' })

const loginUser = async (user: authUser) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URI}/auth/login`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(user),
  })
  const data = await response.json()
  console.log('data', data)

  return data
}
export default function useLogin() {
  const currentClient = useQueryClient()
  const onSubmit = useMutation(loginUser, {
    onSuccess(data) {
      console.log('data', data)
      currentClient.invalidateQueries('user')
    },
    onError(err) {
      console.log('err', err)
    },
  })
  return onSubmit
}
