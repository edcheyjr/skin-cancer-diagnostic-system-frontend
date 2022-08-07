import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Input from '../../Input'
import { setStorageItem, getStorageItem } from '../../../helpers/utils'
import { Icon } from '@iconify/react'

import Button from '../../PrimaryButtons'
import AllergyInfo from './Allergy'

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

const Container = styled.div`
  ${tw`
  w-full
  h-auto
  flex
  flex-col
  gap-2
  `}
`

const AddButton = styled.div`
  ${tw`
   py-3
    flex
    items-center
    gap-2
    text-gray-800
    text-sm
    font-bold
    cursor-pointer
  `}
`
const AddIcon = styled(Icon)`
  ${tw`
     h-6
     w-6
     fill-current
     
  `}
`
const AddAllergyForm = styled.div`
  ${tw`

`}
`
const HorizontalFormControl = styled.div`
  ${tw`
      flex
      items-center
      w-full
      gap-2
      mb-2
  `}
`
const SeverityOptions = ['high', 'medium', 'low']
const AllergySection = () => {
  const [value, setValue] = useState('')
  const [severity, setSeverity] = useState('')
  const [isOpen, setOpenForm] = useState(false)
  const allergyObj = {
    allergy: value,
    severity: severity,
  }
  const allergys = getStorageItem('allergys')
  const handleAddAllergy = () => {
    setStorageItem('allergys', [...allergys, allergyObj])
    setOpenForm(false)
  }
  return (
    <Container>
      <Title>Allergies</Title>
      {allergys.length !== 0 ? (
        allergys.map((allergy, key) => (
          <AllergyInfo allergy={allergy} id={key} key={key} />
        ))
      ) : (
        <>No allergies</>
      )}
      {isOpen ? (
        <AddAllergyForm>
          <HorizontalFormControl>
            <Input
              type={'text'}
              value={value}
              setValue={setValue}
              label='allergy'
            />
            <Input
              type='select'
              options={SeverityOptions}
              value={severity}
              setValue={setSeverity}
              label='severity'
            />
          </HorizontalFormControl>
          <Button
            onClick={handleAddAllergy}
            type={`button`}
            color='#f6854e'
            hoverColor={'#f0783d'}
          >
            add allergy
          </Button>
        </AddAllergyForm>
      ) : (
        <AddButton onClick={() => setOpenForm(true)}>
          <AddIcon icon='carbon:add' /> <>Add allergy</>
        </AddButton>
      )}
    </Container>
  )
}

export default AllergySection
