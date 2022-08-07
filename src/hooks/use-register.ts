import { useMutation, useQueryClient } from 'react-query'

export interface User {
  username: string
  email: string
  role: string
  password: string
}
const headers = new Headers({ 'Content-Type': 'application/json' })

const registerUser = async (user: User) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URI}/user/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(user),
  })
  const data = await response.json()
  console.log('data', data)
  return data
}

export default function useRegister() {
  const currentClient = useQueryClient()
  const onSubmit = useMutation(registerUser, {
    onSuccess() {
      currentClient.invalidateQueries('user')
    },
  })
  return onSubmit
}
