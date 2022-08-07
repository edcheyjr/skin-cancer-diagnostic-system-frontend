import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PatientRecords from '../components/patient'
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
  const { patient_id } = useParams()
  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    document.title = `patient ${patient_id} records`
  }, [patient_id])
  return (
    <Container style={{ background: `url(${BACKGROUND_IMG})` }}>
      <NavBar />
      <TitleSection
        text='test'
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <PatientRecords />
      <Footer />
    </Container>
  )
}
