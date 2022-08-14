import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import useAuthedMutation from '../../hooks/use-auth-mutation-hook'
import { postImage } from '../../services/test-images-api-service'
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
import { convertFileToBase64 } from '../../helpers/utils'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const AddImageDialog = ({ test_id, isOpen, setIsOpen }) => {
  const queryClient = useQueryClient()

  // get query data of a specific patient for editing

  // name split

  const [localization, setLocalization] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const changeHandler = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    if (file) {
      setIsFileSelected(true)
    } else {
      setIsFileSelected(false)
    }
  }

  // validation
  if (localization == '' || !isFileSelected) {
    const handleError = () => setError('inputs cannot be empty')
  }
  // autheticated mutation
  const { isLoading, status, mutate } = useAuthedMutation(postImage, {
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('images')
      // Snapshot the previous value
      const previousImage = queryClient.getQueryData('images')
      // Optimistically update to the new value
      console.log('previousImage', previousImage)
      // Return a context object with the snapshotted value
      return { previousImage }
    },
  })

  // const { isLoading, mutate, status } = useAuthedMutation()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isFileSelected) {
      const fileBase64 = await convertFileToBase64(selectedFile)

      const Image = {
        test_id,
        localization,
        imageBase64: fileBase64,
      }
      mutate(Image, {
        onSuccess: async (response, variable, context) => {
          const data = await response.json()
          if (
            response.status === 201 ||
            response.status === 200 ||
            data.status === 'success'
          ) {
            setSuccess(data.message)
            setIsFileSelected(false)
            setIsOpen(false)
            queryClient.invalidateQueries('images')
          } else {
            setError(data.message)
          }
        },
        onError: async (err, variables, context) => {
          // if (context?.previousImage) {
          //   queryClient.setQueryData('images', context.previousImage)
          // }
          setError(err)
          console.log('Error while updating...', err)
          console.log('data sent is', variables)
        },
        onSettled: async () => {
          queryClient.invalidateQueries('images')
        },
      })
    }
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
        add a new image
      </DialogTitle>

      <DialogContent>
        <form method='POST' onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          <FormControl className='mb-5'>
            <Label>
              Localization<span className='text-[#f6854e]'>*</span>
            </Label>
            <Input
              type={'text'}
              label={'text'}
              value={localization}
              setValue={setLocalization}
              isRequired
            />
          </FormControl>
          <FormControl className='mb-5'>
            <Label>
              Image File<span className='text-[#f6854e]'>*</span>
            </Label>
            <Input
              type={'file'}
              label={'description'}
              setValue={changeHandler}
            />
          </FormControl>

          <DialogActions>
            <Button
              color='#f6854e'
              hoverColor='#f0783d'
              variant='contained'
              type='submit'
            >
              {isLoading ? 'adding...' : ' add'}
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
AddImageDialog.propType = {
  test_id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default AddImageDialog
