import { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Body from '../components/dashboard'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import TitleSection from '../components/TitleSection'
const Container = styled.div`
  ${tw`
bg-cover
bg-center
h-full
w-full
py-6
`}
`
const BACKGROUND_IMG = '/image/cool-background2.png'

export default function Dashboard() {
  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    document.title = 'patients records'
  }, [])
  return (
    <Container style={{ background: `url(${BACKGROUND_IMG})` }}>
      <NavBar />
      <TitleSection
        text='patient'
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Body searchValue={searchValue} />
      <Footer />
    </Container>
  )
}
