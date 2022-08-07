import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const PrimaryButtons = ({
  type,
  color,
  hoverColor,
  text,
  variant = 'contained',
  children,
  onClick,
}) => {
  const CustomButton = styled(Button)(({ theme }) => ({
    color:
      (variant === 'outlined' && 'black') ||
      theme.palette.getContrastText(color),
    backgroundColor: variant === 'contained' ? color : 'transparent',
    '&:hover': {
      backgroundColor: hoverColor,
      color: 'white',
    },
    fontSize: 12,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    border: variant === 'contained' ? 'solid ' : `2px solid ${color}`,
  }))
  return (
    <CustomButton
      type={type}
      className='w-full group'
      variant={variant}
      onClick={onClick}
    >
      {text || children}
    </CustomButton>
  )
}

PrimaryButtons.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  text: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
}

export default PrimaryButtons
