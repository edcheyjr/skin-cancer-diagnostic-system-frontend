import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import useAuthedMutation from '../../hooks/use-auth-mutation-hook'
import { postPatientRecord } from '../../services/tests-api-service'
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
  FormControl,
  Label,
  ErrorMessage,
  SuccessMessage,
} from './NewPatientDialog'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const EditPatientDialog = ({ id, isOpen, setIsOpen }) => {
  const queryClient = useQueryClient()

  // get query data of a specific patient for editing

  // name split

  const [testName, setTestName] = useState('')
  const [testDesc, setTestDesc] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // validation
  if (testDesc === '' && testName === '') {
    const handleError = () => setError('inputs cannot be empty')
  }
  // mutation
  const { isLoading, mutate, status } = useAuthedMutation(postPatientRecord, {
    onMutate: async (newPatient) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('patientsRecord')
      // Snapshot the previous value
      const previousPatients = queryClient.getQueryData('patientsRecord')
      // Optimistically update to the new value
      queryClient.setQueryData('patientsRecord', (old) => [...old, newPatient])

      // Return a context object with the snapshotted value
      return { previousPatients }
    },
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const Test = {
      test_name: testName,
      test_description: testDesc,
    }
    mutate(Test, {
      onSuccess: async (response, variable, context) => {
        const data = await response.json()
        if (
          response.status === 201 ||
          response.status === 200 ||
          data.status === 'success'
        ) {
          setSuccess(data.message)

          setIsOpen(false)
          queryClient.invalidateQueries('patientsRecord')
        } else {
          setError(data.message)
        }
      },
      onError: async (err, variables, context) => {
        queryClient.setQueryData('patientsRecord', context.previousPatients)
        setError(err)
        console.log('Error while posting...', err)
        console.log('data sent is', variables)
      },
      onSettled: async () => {
        queryClient.invalidateQueries('patientsRecord')
      },
    })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  //timeout reset setError or setSuccess
  setTimeout(() => {
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
        add a new test
      </DialogTitle>

      <DialogContent>
        <form method='POST' onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          <FormControl className='mb-5'>
            <Label>
              test name<span className='text-[#f6854e]'>*</span>
            </Label>
            <Input
              type={'text'}
              label={'text'}
              value={testName}
              setValue={setTestName}
              isRequired
            />
          </FormControl>
          <FormControl className='mb-5'>
            <Label>
              test description<span className='text-[#f6854e]'>*</span>
            </Label>
            <Input
              type={'text'}
              label={'description'}
              value={testDesc}
              setValue={setTestDesc}
            />
          </FormControl>

          <DialogActions>
            <Button
              color='#f6854e'
              hoverColor='#f0783d'
              variant='contained'
              type='submit'
            >
              add
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
