import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { Select, InputLabel, FormControl } from '@mui/material'

const InputContainer = styled.div`
  ${tw`
    relative
    rounded-md
    w-full
  `}
`

const CustomInput = styled.input`
  ${tw`
    relative
    w-full
    px-2
    py-2
    rounded-md
    border
    border-gray-400
    text-gray-800
    text-sm
    lg:text-base
    font-medium
    bg-[#f9fafb]
  `}
`
const CustomFile = styled.input`
  ${tw`
    relative
    w-full
    px-2
    py-2
    rounded-md
    text-gray-800
    text-sm
    lg:text-base
    font-medium
    bg-[#f9fafb]
`}
`
const CustomSelect = styled.select`
  ${tw`
    relative
    w-full
    rounded-md
    text-sm
    bg-[#f9fafb]
    lg:text-base
    border
    border-gray-400
    text-gray-800
    font-medium
    px-2
    py-2
    appearance-none
`}
`
const CustomOption = styled.option`
  ${tw`
    appearance-none
    relative
    w-full
    px-2
    py-2
    rounded-md
    hover:border
    hover:border-gray-300
    hover:bg-[#f6854e]
    hover:text-white
    text-gray-800
    text-sm
    lg:text-base
    font-medium
  `}
`
const InputCard = ({
  type,
  label,
  value,
  defaultValue,
  setValue,
  options,
  max,
  min,
  isRequired = false,
}) => {
  if (type == 'select') {
    console.log('options', options)
  }
  return (
    <InputContainer className='bg-gray-50 '>
      {type === 'select' ? (
        <FormControl fullWidth>
          {/* <InputLabel
            id='role'
            style={{
              background: '#f8fafc ',
              padding: '2px',
              fontWeight: '500',
              fontFamily: 'montserrat',
            }}
          >
            Role
          </InputLabel> */}
          <CustomSelect
            labelId='role'
            id='role'
            defaultValue={defaultValue || options[0]}
            onChange={({ target }) => {
              return setValue(target.value)
            }}
            className={`outline-1 outline-[#f6854e]`}
          >
            {options.map((option, key) => (
              <CustomOption
                key={key}
                value={option}
                disabled={option === 'none' && true}
              >
                {option}
              </CustomOption>
            ))}
          </CustomSelect>
        </FormControl>
      ) : type === 'datetime-local' ? (
        <CustomInput
          type={type}
          defaultValue={value}
          placeholder={label}
          min={min}
          max={max}
          className='outline-1 outline-[#f6854e]'
          onChange={({ target }) => setValue(target.value)}
          required={isRequired}
        />
      ) : type === 'file' ? (
        <CustomFile
          type={type}
          // defaultValue={value}
          // placeholder={label}
          className='outline-1 outline-dashed outline-[#f6854e]   file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#f6854e3f] file:text-[#f6854e] hover:file:bg-[#f6854e4f]'
          onChange={setValue}
          required={isRequired}
        />
      ) : (
        <CustomInput
          type={type}
          value={value}
          placeholder={label}
          min={min}
          max={max}
          className='outline-2  outline-offset-3 outline-[#f6854e]'
          onChange={({ target }) => setValue(target.value)}
          required={isRequired}
        />
      )}
    </InputContainer>
  )
}
InputCard.PropType = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  defaultValue: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  max: PropTypes.number,
  min: PropTypes.number,
  isRequired: PropTypes.bool.isRequired,
}

export default InputCard
