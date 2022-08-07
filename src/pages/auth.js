import { useEffect, useState } from 'react'
import { Avatar, Card, CardHeader, CardContent } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Icon } from '@iconify/react'
import Login from '../components/Login'
import Register from '../components/Register'

const Container = styled.div`
  ${tw`
      container
      mx-auto
      w-full
      h-screen
      flex
      justify-center
      items-center
      flex-col
  `}
`
const Title = styled.div`
  ${tw`
      text-lg
      font-bold
      capitalize
      text-gray-800
  `}
`
const SwitchText = styled.div`
  ${tw`
    mt-4
    flex
    items-center
    justify-center
    gap-2
    text-sm
    font-semibold
    text-gray-600
  `}
`

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  useEffect(() => {
    document.title = isLogin ? 'login' : 'register'
  }, [isLogin])
  return (
    <>
      <Container>
        <Card
          elevation={3}
          className='border-t-4 border-[#f6854e] shadow-[#f6854e]'
          sx={{ width: 400 }}
        >
          <CardHeader
            avatar={
              <Avatar
                className='mb-4'
                aria-label='lock'
                sx={{ bgcolor: '#f6854e' }}
              >
                <Icon
                  className='h-6 w-6 fill-current text-white'
                  icon={'clarity:lock-solid'}
                />
              </Avatar>
            }
            title={
              <Title style={{ fontFamily: 'Montserrat' }}>
                {isLogin ? 'welcome back' : 'Register'}
              </Title>
            }
            className='flex flex-col items-center justify-center'
          />
          <CardContent>{isLogin ? <Login /> : <Register />}</CardContent>
        </Card>
        {isLogin ? (
          <SwitchText>
            register a new account?{' '}
            <div
              className='text-[#f6854e] capitalize cursor-pointer'
              onClick={() => {
                return setIsLogin(!isLogin) && console.log('clicked')
              }}
            >
              register
            </div>
          </SwitchText>
        ) : (
          <SwitchText>
            login to an account?{' '}
            <div
              className='text-[#f6854e] capitalize cursor-pointer'
              onClick={() => setIsLogin(!isLogin)}
            >
              login
            </div>
          </SwitchText>
        )}
      </Container>
    </>
  )
}
