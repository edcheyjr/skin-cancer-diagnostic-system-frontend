import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Icon } from '@iconify/react'
import Button from '../components/PrimaryButtons'
import NewPatientDialog from './dialogs/NewPatientDialog'

const Container = styled.div`
  ${tw`
      container
      mx-auto
      flex
      items-center
      w-full
      mt-8
      xl:px-10
      px-6
      justify-between
`}
`
const Input = styled.input`
  ${tw`
      relative
      w-full
      px-2
      py-2.5
      rounded-md
      border
      border-gray-400
      text-gray-800
      text-sm
      lg:text-base
      font-medium
      placeholder:font-light
      bg-[#f9fafb]
  `}
`
const CustomIcon = styled(Icon)`
  ${tw`
      h-6
      w-6
      fill-current
    
  `}
`
const SearchIcon = styled(Icon)`
  ${tw`
      absolute
      text-gray-600
      right-3
      top-[20%]
      fill-current
      h-7
      w-7
  `}
`
const SearchBar = styled.div`
  ${tw`
      relative
  `}
`
const TitleSection = ({ text, searchValue, setSearchValue }) => {
  const [isVisible, setIconVisible] = useState(true)
  const [isOpen, setNewPatientDialog] = useState(false)
  return (
    <Container>
      <SearchBar
        onFocus={() => setIconVisible(false)}
        onBlur={() => setIconVisible(true)}
      >
        <Input
          type='text'
          placeholder={'search...'}
          value={searchValue}
          className='outline-1 outline-[#f6854e]'
          onChange={({ target }) => setSearchValue(target.value)}
        />
        {isVisible && <SearchIcon icon='arcticons:xiaoyuan-search' />}
      </SearchBar>
      <div>
        <Button
          variant='outlined'
          color='#102c6fdf'
          hoverColor={'#102c6f'}
          onClick={() => setNewPatientDialog(true)}
        >
          <div className='flex items-center gap-1 text-[#102c6fdf] group-hover:text-gray-50 h-full w-full'>
            <span className='mx-auto my-auto'>add {text}</span>
            <CustomIcon icon={'carbon:add-alt'} />
          </div>
        </Button>
        <NewPatientDialog isOpen={isOpen} setIsOpen={setNewPatientDialog} />
      </div>
    </Container>
  )
}

TitleSection.propType = {
  text: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
}

export default TitleSection
