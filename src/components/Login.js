import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

import Input from './Input'
import Button from './PrimaryButtons'
import { setStorageItemWithExpiry } from '../helpers/utils'
import useLogin from '../hooks/use-login'
import { useNavigate } from 'react-router-dom'
import { isError } from 'react-query'

const InputsContainer = styled.div`
  ${tw`
      flex
      flex-col
      gap-4
      mb-6
  `}
`
const ErrorMessage = styled.div`
  ${tw`
    text-red-600
    bg-red-100
    lg:text-sm
    text-xs
    font-medium
    rounded-lg
    py-1
    px-2
    mb-4
  `}
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { mutate, isLoading, status } = useLogin()
  console.log('status', status)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    // handle login and on success redirect to dashboard and store the token in secure cookies
    e.preventDefault()

    const user = {
      email,
      password,
    }
    return mutate(user, {
      onSuccess: (data, variable, context) => {
        if (data.status === 'success') {
          setStorageItemWithExpiry('user', data, 1000 * 60 * 60 * 12) //expires in 12 hrs
          navigate('/')
        } else {
          console.log(data.status)
          setError(data.message)
        }
      },
      onError: (err) => {
        console.error('error', err)
        setError('oops, something went wrong with the server, try again')
      },
      onSettled: () => {
        console.log('settled')
      },
    })
  }
  return (
    <form method='POST' onSubmit={handleLogin}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputsContainer>
        <Input type='email' value={email} setValue={setEmail} label={'email'} />
        <Input
          type='password'
          value={password}
          setValue={setPassword}
          label={'password'}
          isRequired
        />
      </InputsContainer>
      <Button
        color='#f6854e'
        hoverColor='#f0783d'
        variant='contained'
        type='submit'
      >
        {isLoading ? 'Logging in...' : 'login'}
      </Button>
    </form>
  )
}

export default Login
