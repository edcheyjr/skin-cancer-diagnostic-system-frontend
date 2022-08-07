import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import Button from '../PrimaryButtons'
import DateTimePicker from 'react-datetime-picker'
import { postPatient } from '../../services/patient-api-service'
import { useQueryClient } from 'react-query'
import useAuthedMutation from '../../hooks/use-auth-mutation-hook'
import { formatDate } from '../../helpers/utils'
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Slide,
} from '@mui/material'
import Input from '../Input'
export const HorizontalContainer = styled.div`
  ${tw`
      flex
      items-center
      w-full
      gap-8
  `}
`
export const FormControl = styled.div`
  ${tw`
    flex
    flex-col
    gap-1
    w-auto
`}
`

export const Label = styled.label`
  ${tw`
    text-sm
    font-semibold
    uppercase
    text-gray-800
`}
`
export const ErrorMessage = styled.div`
  ${tw`
    text-red-600
    bg-red-100
    lg:text-sm
    text-xs
    font-medium
    rounded-lg
    py-1
    px-2
    mb-4
  `}
`
export const SuccessMessage = styled.div`
  ${tw`
    text-[#49b267df]
    bg-[#49b2673f]
    lg:text-sm
    text-xs
    font-medium
    rounded-lg
    py-1
    px-2
    mb-4
  `}
`
export const CustomDateTimePicker = styled(DateTimePicker)`
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

export const GENDER = ['male', 'female']
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const NewPatientDialog = ({ isOpen, setIsOpen }) => {
  // use query
  const currentClient = useQueryClient()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [gender, setGender] = useState('male')
  const [DOB, setDOB] = useState(new Date())
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  // validation
  if (
    firstname === '' &&
    lastname === '' &&
    email === '' &&
    tel === '' &&
    gender === '' &&
    DOB === '' &&
    city === '' &&
    region === ''
  ) {
    const handleError = () => setError('inputs cannot be empty')
  }
  if (DOB <= 0) {
    const handleError = () => setError('DOB cannot be zero')
  }
  // if (gender !== 'male' || gender !== 'female') {
  //   const handleError = () => setError('gender can be male or female only')
  // }
  const { isLoading, mutate, status } = useAuthedMutation(postPatient, {
    onMutate: async (newPatient) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await currentClient.cancelQueries('patients')
      // Snapshot the previous value
      const previousPatients = currentClient.getQueryData('patients')
      // Optimistically update to the new value
      currentClient.setQueryData('patients', (old) => [...old, newPatient])

      // Return a context object with the snapshotted value
      return { previousPatients }
    },
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const PatientRecords = {
      name: `${firstname} ${lastname}`,
      email,
      tel,
      DOB: formatDate(DOB),
      sex: gender,
      city,
      region,
    }
    console.log('patient', PatientRecords)
    mutate(PatientRecords, {
      onSuccess: async (response, variable, context) => {
        const data = await response.json()
        if (
          response.status === 201 ||
          response.status === 200 ||
          data.status === 'success'
        ) {
          setSuccess(data.message)

          setIsOpen(false)
          currentClient.invalidateQueries('patient')
        } else {
          setError(data.message)
        }
      },
      onError: async (err, variables, context) => {
        currentClient.setQueryData('todos', context.previousPatients)
        setError(err)
        console.log('Error while posting...', err)
        console.log('data sent is', variables)
      },
      onSettled: async () => {
        currentClient.invalidateQueries('patient')
      },
    })
  }
  const timeoutId = setTimeout(() => {
    setSuccess('')
    setError('')
  }, 30000)
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth='lg'
    >
      <DialogTitle
        className='text-[#102c6fef] capitalize text-2xl lg:text-xl'
        style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}
      >
        register a new patient
      </DialogTitle>

      <DialogContent>
        <form method='POST' onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          <HorizontalContainer className='mb-5'>
            <FormControl>
              <Label>
                firstname<span className='text-[#f6854e]'>*</span>
              </Label>
              <Input
                type={'text'}
                label='firstname'
                value={firstname}
                setValue={setFirstname}
                isRequired
              />
            </FormControl>
            <FormControl>
              <Label>
                lastname<span className='text-[#f6854e]'>*</span>
              </Label>
              <Input
                type={'text'}
                label='lastname'
                value={lastname}
                setValue={setLastname}
                isRequired
              />
            </FormControl>
          </HorizontalContainer>
          <FormControl className='mb-5'>
            <Label>
              email<span className='text-[#f6854e]'>*</span>
            </Label>
            <Input
              type={'email'}
              label='example@gmail.com'
              value={email}
              setValue={setEmail}
              isRequired
            />
          </FormControl>
          <FormControl className='mb-5'>
            <Label>
              tel<span className='text-[#f6854e]'>*</span>
            </Label>
            <Input
              type={'tel'}
              label='0701200709'
              value={tel}
              setValue={setTel}
              pattern='[0-9]{4}[0-9]{3}[0-9]{3}'
            />
          </FormControl>
          <HorizontalContainer className='mb-5'>
            <FormControl>
              <Label>
                Date Of Birth<span className='text-[#f6854e]'>*</span>
              </Label>
              <CustomDateTimePicker
                className='outline-1 outline-[#f6854e]'
                value={DOB}
                onChange={setDOB}
                isRequired
              />
            </FormControl>
            <FormControl>
              <Label>
                gender<span className='text-[#f6854e]'>*</span>
              </Label>
              <Input
                type={'select'}
                label='0701200709'
                value={gender}
                setValue={setGender}
                options={GENDER}
                isRequired
              />
            </FormControl>
          </HorizontalContainer>
          <FormControl className='mb-5'>
            <Label>
              region<span className='text-[#f6854e]'>*</span>
            </Label>
            <Input
              type={'text'}
              label='Kiambu'
              value={region}
              setValue={setRegion}
              isRequired
            />
          </FormControl>
          <FormControl className='mb-5'>
            <Label>
              city<span className='text-[#f6854e]'>*</span>
            </Label>
            <Input
              type={'text'}
              label='Nairobi'
              value={city}
              setValue={setCity}
              isRequired
            />
          </FormControl>

          <DialogActions>
            <Button
              color='#f6854e'
              hoverColor='#f0783d'
              variant='contained'
              type='submit'
            >
              {isLoading ? 'adding...' : 'add'}
            </Button>
            <Button
              variant='outlined'
              color='#102c6fdf'
              hoverColor={'#102c6f'}
              onClick={handleClose}
            >
              cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
NewPatientDialog.propType = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default NewPatientDialog
