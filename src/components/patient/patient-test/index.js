import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Icon } from '@iconify/react'
import { Text } from '..'
import ImageCard from './TestImageCard'
import AddImageDialog from '../../dialogs/AddImageDialog'
import { RegDate } from '../../dashboard/PatientCard'

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
    w-[90%]
  `}
`
const TestDescription = styled.div`
  ${tw`
      text-sm
      lg:text-base
      font-semibold
      text-gray-700
      w-[90%]
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

const CloseMoreDetailsBtn = styled.div`
  ${tw`
    absolute
    top-1
    right-1
    py-3
    px-2
    flex
    items-center
    gap-2
    text-gray-800
    hover:text-[#102c6f]
    text-sm
    lg:text-base
    font-bold
    cursor-pointer
    border
    border-[#102c6f3f]
    hover:bg-[#102c6f3f]
    rounded-md
`}
`
const ViewMoreIcon = styled(Icon)`
  ${tw`
      h-5
      w-5
      lg:h-6
      lg:w-6
      fill-current
  `}
`
const PatientTest = ({
  test_id,
  patient_id,
  test_name,
  test_description,
  status,
  test_result,
  doc_diagnosis,
  doc_recommendation,
  date_modified,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)
  return (
    <Container className='relative'>
      {status !== 'active' && (
        <CloseMoreDetailsBtn onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'view less' : 'view more'}
          <ViewMoreIcon
            icon='akar-icons:chevron-down'
            className={`transform ease-out duration-150 ${
              isVisible ? 'rotate-[180deg]' : 'rotate-0'
            }`}
          />
        </CloseMoreDetailsBtn>
      )}
      <TestTitle>{test_name}</TestTitle>
      <TestDescription className='mt-2'>{test_description}</TestDescription>
      {status !== 'active' && (
        <TestDescription className='mt-2'>
          result: {test_result}
        </TestDescription>
      )}
      {status !== 'active' && (
        <TestDescription className='mt-2'>
          doctor diagnosis: {doc_diagnosis}
        </TestDescription>
      )}
      {status !== 'active' && (
        <TestDescription className='mt-2'>
          doctor recommendation: {doc_recommendation}
        </TestDescription>
      )}
      {!isVisible && status !== 'active' ? (
        <></>
      ) : (
        <TestImagesContainer>
          {status === 'active' && (
            <AddPhotoButton
              className='group'
              onClick={() => setIsDialogOpen(true)}
            >
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
          )}
          {/*  image input form dialog */}
          <AddImageDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />

          <ImageCard />
        </TestImagesContainer>
      )}
      {status !== 'active' && (
        <RegDate className='mt-4'>{date_modified}</RegDate>
      )}
    </Container>
  )
}
PatientTest.propType = {
  test_id: PropTypes.string.isRequired,
  patient_id: PropTypes.string.isRequired,
  test_name: PropTypes.string.isRequired,
  test_description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  test_result: PropTypes.string,
  doc_daignosis: PropTypes.string,
  doc_recommendation: PropTypes.string,
  date_modified: PropTypes.string,
}
export default PatientTest
