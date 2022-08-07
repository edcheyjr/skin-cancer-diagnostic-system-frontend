import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`
  ${tw`
    container
    mx-auto
    w-full
    xl:px-10
    px-6
    py-3
    mt-8
    flex
  `}
`
const CopyRight = styled.div`
  ${tw`
      text-sm
      md:text-base
      lg:text-lg
      text-gray-500
      font-medium
      capitalize
  `}
`

const Footer = () => {
  return (
    <Container>
      <CopyRight>Copyright &copy; 2022 thishospital, org</CopyRight>
    </Container>
  )
}

export default Footer
