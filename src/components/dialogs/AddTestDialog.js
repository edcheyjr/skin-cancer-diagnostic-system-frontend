import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import useAuthedMutation from '../../hooks/use-auth-mutation-hook'
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
  // const { isLoading, mutate, status } = useAuthedMutation()
  const handleSubmit = (e) => {
    e.preventDefault()
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
