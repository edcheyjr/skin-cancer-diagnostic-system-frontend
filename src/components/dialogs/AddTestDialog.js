import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import useAuthedMutation from '../../hooks/use-auth-mutation-hook'
import { formatDate } from '../../helpers/utils'
import { updatePatient } from '../../services/patient-api-service'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material'
import Button from '../PrimaryButtons'
import Input from '../Input'
import {
  HorizontalContainer,
  FormControl,
  Label,
  ErrorMessage,
  SuccessMessage,
  GENDER,
  CustomDateTimePicker,
} from './NewPatientDialog'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const EditPatientDialog = ({ id, isOpen, setIsOpen }) => {
  const queryClient = useQueryClient()

  // get query data of a specific patient for editing
  const data = queryClient
    .getQueryData('patients')
    ?.find((patient) => patient.public_id === id)

  // name split
  const namesArr = data?.name?.split(' ')
  const [firstname, setFirstname] = useState(namesArr[0])
  const [lastname, setLastname] = useState(namesArr[1])
  const [email, setEmail] = useState(data.email)
  const [tel, setTel] = useState(data.tel)
  const [gender, setGender] = useState(data.sex)
  const [DOB, setDOB] = useState(new Date(data?.DOB || new Date()))
  const [city, setCity] = useState(data.city)
  const [region, setRegion] = useState(data.region)
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
  const { isLoading, mutate, status } = useAuthedMutation(updatePatient, {
    onMutate: async (editPatient) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['patients', editPatient.id])
      // Snapshot the previous value
      const previousData = queryClient
        .getQueryData('patients')
        ?.find((patient) => patient.public_id === editPatient.id)
      console.log('previousData', previousData)
      // Return a context with the previous and new todo
      return { previousData, editPatient }
    },
    // If the mutation fails, use the context we returned above
    onError: (err, editPatient, context) => {
      setError(err)
      queryClient.setQueryData(
        ['patients', context.editPatient.id],
        context.previousData
      )
    },
    // Always refetch after error or success:
    onSettled: (editPatient) => {
      queryClient.invalidateQueries(['patients', editPatient.id])
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const PatientEditedRecords = {
      name: `${firstname} ${lastname}`,
      email,
      tel,
      DOB: formatDate(DOB),
      sex: gender,
      city,
      region,
    }
    mutate(
      { id, patient: PatientEditedRecords },
      {
        onSuccess: async (response) => {
          const data = await response.json()
          if (data.status === 'success') {
            setSuccess(data.message)
          } else {
            setError(data.message)
          }
        },
      }
    )
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  //timeout reset setError or setSuccess
  const timeoutId = setTimeout(() => {
    setSuccess('')
    setError('')
  }, 30000)
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
        edit patient record
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
                label={namesArr[0]}
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
                label={namesArr[1]}
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
              label={data.email}
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
              label={data.tel}
              value={tel}
              setValue={setTel}
            />
          </FormControl>
          <HorizontalContainer className='mb-5'>
            <FormControl>
              <Label>
                DOB<span className='text-[#f6854e]'>*</span>
              </Label>
              <CustomDateTimePicker value={DOB} onChange={setDOB} />
            </FormControl>
            <FormControl>
              <Label>
                gender<span className='text-[#f6854e]'>*</span>
              </Label>
              <Input
                type={'select'}
                value={gender}
                setValue={setGender}
                options={GENDER}
                defaultValue={data.sex}
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
              edit
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
EditPatientDialog.propType = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default EditPatientDialog
