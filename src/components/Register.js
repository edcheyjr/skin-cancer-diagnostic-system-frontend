import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import Button from './PrimaryButtons'
import useRegister from '../hooks/use-register'
import { setStorageItemWithExpiry } from '../helpers/utils'

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
  const roles = ['none', 'admin', 'doctor', 'lab-tech', 'nurse']
  const [username, setUsernamee] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { mutate, isLoading, isError, status } = useRegister()

  // handle registration and on success redirect to dashboard and store the token in secure cookies
  const handleRegistration = async (e) => {
    e.preventDefault()

    const user = {
      username,
      email,
      role,
      password,
    }
    console.log('role', role)
    if (role === '') {
      setError('please select a role')
    } else {
      mutate(user, {
        onSuccess: (data, variable, context) => {
          console.log('data', data[0])
          console.log('status', data[1])
          setStorageItemWithExpiry('user', data[0], 1000 * 60 * 60 * 12) //expires in 12 hrs or 43200000 millisec
          if (data[0].status === 'success') {
            navigate('/')
          } else {
            console.log(data[0].status)
            setError(data[0].message)
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
  }

  return (
    <form method='POST' onSubmit={handleRegistration}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputsContainer>
        <Input
          type='text'
          value={username}
          setValue={setUsernamee}
          label={'username'}
          isRequired
        />
        <Input
          type='email'
          value={email}
          setValue={setEmail}
          label={'email'}
          isRequired
        />
        <Input
          type='select'
          value={role}
          setValue={setRole}
          label={'role'}
          options={roles}
          isRequired
        />
        <Input
          type='password'
          value={password}
          setValue={setPassword}
          label={'password'}
          isRequired
        />
      </InputsContainer>
      <Button
        type='submit'
        color='#f6854e'
        hoverColor='#f0783d'
        variant='contained'
      >
        {isLoading ? 'registering...' : '  register'}
      </Button>
    </form>
  )
}

export default Login
