import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`
  ${tw`
  w-full
   h-auto
  `}
`
const Title = styled.div`
  ${tw`
    lg:text-2xl
    text-xl
    capitalize
    text-gray-600
    font-bold
    mb-3
  `}
`
const SyptomsContainer = styled.div`
  ${tw`
  w-full
  h-auto
  flex
  flex-wrap
  gap-2
  `}
`
const SymptomsText = styled.div`
  ${tw`
   capitalize
    text-gray-800
    font-semibold
    lg:text-base
    md:text-sm
    text-xs
`}
`
const CommonSymptoms = () => {
  return (
    <Container>
      <Title>Common Symptoms</Title>
      <SyptomsContainer>
        <SymptomsText>spots on skin, </SymptomsText>
        <SymptomsText>uncomfortable sensation, </SymptomsText>
      </SyptomsContainer>
    </Container>
  )
}

export default CommonSymptoms
