import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { useQueryClient } from 'react-query'

import Loading from '../Loading'
import PatientCard from './PatientCard'

import useAuthedQuery from '../../hooks/user-auth-query-hook'
import { getAllPatients } from '../../services/patient-api-service'
const Patients = [
  {
    id: 1,
    public: '232124234',
    name: 'john doe',
    age: 45,
    sex: 'male',
    region: 'Nairobi',
    city: 'Nairobi',
    tel: '0720013011',
    email: 'patient@gmail.com',
    DOB: '24/12/2000',
    registedDate: '24/12/2000',
  },
  {
    id: 2,
    public: '232qwe24qw34',
    name: 'mary anne',
    age: 45,
    sex: 'female',
    region: 'Kiambu',
    city: 'Nairobi',
    tel: '0720011211',
    email: 'maryanne@gmail.com',
    DOB: '20/12/1978',
    registedDate: '25/12/2000',
  },
]

const Container = styled.section`
  ${tw`
    container
    rounded-md
    bg-gray-50/30
    mx-auto
    w-full
    xl:px-10
    px-6
    py-8
    mt-8
    min-h-screen
  `}
`
const PatientsContainer = styled.div`
  ${tw`
  grid
    xl:grid-cols-4
    lg:grid-cols-3
    sm:grid-cols-2
    grid-cols-1
    gap-8
  `}
`
const PatientTitle = styled.div`
  ${tw`
      w-full
      font-bold
      text-gray-900
      text-4xl
      sm: text-2xl
      uppercase
      mb-8
  `}
`

const Body = ({ searchValue }) => {
  const currentClient = useQueryClient()
  const { isLoading, isError, error, data, isSuccess } = useAuthedQuery(
    ['patients'],
    getAllPatients,
    {
      onSuccess: (data) => {
        currentClient.setQueryData('patients', data)
      },
    }
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (isSuccess && data) {
    const filteredData = data.filter((patient) =>
      patient.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (
      <Container className='backdrop-blur-3xl backdrop-brightness-150'>
        <PatientTitle>Patients</PatientTitle>
        <PatientsContainer>
          {filteredData.map((patient, key) => (
            <PatientCard
              key={key}
              id={parseInt(patient.id)}
              public_id={patient.public_id}
              sex={patient.sex}
              username={patient.name}
              DOB={patient.DOB}
              tel={patient.tel}
              email={patient.email}
              age={patient.age}
              region={patient.region}
              city={patient.city}
              dateRegisted={patient.date_created}
            />
          ))}
        </PatientsContainer>
      </Container>
    )
  }
}
Body.propType = {
  searchValue: PropTypes.string.isRequired,
}

export default Body
