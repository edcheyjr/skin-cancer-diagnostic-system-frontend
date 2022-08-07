import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Icon } from '@iconify/react'
import { Text } from '..'
import ImageCard from './TestImageCard'

const Container = styled.div`
  ${tw`
    py-3
    flex-col
    gap-3
  `}
`
const TestTitle = styled.div`
  ${tw`
    capitalize
    font-bold
    text-lg
    text-xl
    text-[#102c6f]
  `}
`
const TestDescription = styled.div`
  ${tw`
      text-sm
      lg:text-base
      font-semibold
      text-gray-700
  `}
`
const TestImagesContainer = styled.div`
  ${tw`
      mt-4
      grid
      xl:grid-cols-3
      lg: grid-cols-3
      md:grid-cols-2
      sm:grid-cols-2
      grid-cols-1
      gap-8
  `}
`
const AddPhotoButton = styled.button`
  ${tw`
  
  rounded-md
  bg-gray-100
  border
  border-[#102c6f3f]
  hover:border-[#f0783d9f]
  gap-2
`}
`

const CustomIcon = styled(Icon)`
  ${tw`
    fill-current
    text-[#f6854e]
    h-8
    w-8
  `}
`
const TextContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-1
  `}
`
const MaxSizeText = styled.div`
  ${tw`
      uppercase
      lg:text-sm
      text-xs
      font-semibold
      text-gray-500
      text-left
  `}
`
const ImageIcon = styled(Icon)`
  ${tw`
  fill-current
  text-gray-400
  h-56
  w-auto
  mx-auto
  `}
`
const IconButton = styled.div`
  ${tw`
      rounded-full
      p-2
      group-hover:bg-[#f0783d3f]
  `}
`
const PatientTest = () => {
  return (
    <Container>
      <TestTitle>Title</TestTitle>
      <TestDescription>
        Test description Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Veniam beatae odit tenetur corrupti magnam quia voluptate eaque
        voluptatum, officia modi hic atque unde deleniti, temporibus labore
        consequatur, autem sint. Cumque.
      </TestDescription>
      <TestImagesContainer>
        <AddPhotoButton className='group'>
          <ImageIcon icon='bx:image-add' />
          <div className='flex py-4 px-4  gap-2'>
            <IconButton color='warning' aria-label='add test image sample'>
              <CustomIcon
                icon='ant-design:file-image-twotone'
                className='mx-auto my-auto'
              />
            </IconButton>
            <TextContainer>
              <Text>add test image</Text>
              <MaxSizeText>max 54.6 mb </MaxSizeText>
            </TextContainer>
          </div>
        </AddPhotoButton>
        <ImageCard />
      </TestImagesContainer>
    </Container>
  )
}

export default PatientTest
