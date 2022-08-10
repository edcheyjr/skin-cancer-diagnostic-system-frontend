import styled from 'styled-components'
import tw from 'twin.macro'
import { Icon } from '@iconify/react'
import Logo from './Logo'
import Button from '../components/PrimaryButtons'
import useLogout from '../hooks/use-logout'
import { useNavigate } from 'react-router-dom'
import {
  removeItemFromStorage,
  getStorageItemWithExpiry,
} from '../helpers/utils'

const NavBarContainer = styled.nav`
  ${tw`
    bg-gray-50
    flex
    justify-between
    items-center
    w-full
    py-6
    container
    mx-auto
    xl:px-10
    px-6
    shadow-xl
  `};
`

const RightContainer = styled.div`
  ${tw`
    flex
    gap-3
    items-center

  `}
`
const SystemName = styled.div`
  ${tw`
    text-[#102c6fdf]
    font-extrabold
    text-base
    md:text-lg
    lg:text-2xl
    xl:text-3xl
    capitalize
    whitespace-nowrap
  `}
`
const LeftContainer = styled.div``

const CustomIcon = styled(Icon)`
  ${tw`
      h-12
      w-12
      fill-current
      text-[#102c6fdf]
      hover:text-[#102c6f]
  `}
`
const Name = styled.div`
  ${tw`
    lg:text-base
    text-sm
    whitespace-nowrap
    font-bold
    capitalize
    text-[#102c6fdf]
    cursor-pointer
    hover:text-[#102c6f]
    text-center
    align-middle
  `}
`
const NavBar = () => {
  const navigate = useNavigate()
  const item = getStorageItemWithExpiry('user')
  let role = null
  const roles = ['admin', 'doctor', 'lab-tech', 'nurse']
  if (item.user.role === roles[0]) {
    role = 'admin'
  }
  if (item.user.role === roles[1]) {
    role = 'doc. '
  }
  if (item.user.role === roles[2]) {
    role = 'lab-tech'
  }
  if (item.user.role === roles[3]) {
    role = 'nurse'
  }
  const usernamesArr = item.user.username.split(' ')
  let name = usernamesArr[1]
  if (!name) name = usernamesArr[0]

  const { mutate, isLoading, status } = useLogout()
  const handleLogout = async (e) => {
    e.preventDefault()
    mutate(undefined, {
      onSuccess: (response) => {
        if (response.status === 'success') {
          console.log('response', response)
          console.log('message', response.message)
          removeItemFromStorage('user')
        }
      },
      onError: async (error) => {
        console.error('error', error)
      },
      onSettled: () => {
        console.log('settled')
      },
    })
  }

  console.log('status', status)
  return (
    <NavBarContainer className='shadow-[#102c6f2f]'>
      <LeftContainer>
        <Logo onClick={() => navigate('/')} />
      </LeftContainer>
      <SystemName>AI Diagnostic System</SystemName>
      <RightContainer className='w-fit'>
        <CustomIcon icon={`carbon:notification-filled`} />
        <Name>
          {role} {name}
        </Name>
        <Button onClick={handleLogout} color='#f6854e' hoverColor='#f0783d'>
          {isLoading ? 'logging out...' : ' logout'}
        </Button>
      </RightContainer>
    </NavBarContainer>
  )
}
export default NavBar
