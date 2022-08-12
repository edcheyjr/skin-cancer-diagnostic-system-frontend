import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Paper } from '@mui/material'
import { Icon } from '@iconify/react'
import { formatTelNumber } from '../../helpers/utils'
import ActionButton from '../PrimaryButtons'
import EditPatientDialog from '../dialogs/EditPatientDialog'
import { useNavigate, Link } from 'react-router-dom'

// import svgs
const Female = '/svg/female-avatar.svg'
const Male = '/svg/male-avatar.svg'

const CardHeader = styled.div`
  ${tw`
      flex
      justify-between
      mb-5
  `}
`

const EditIcon = styled(Icon)`
  ${tw`
      w-8
      h-8
      fill-current
      text-[#102c6fcf]
      cursor-pointer
      hover:text-[#102c6f]
   `}
`
const Avatar = styled.div`
  ${tw`
     rounded-full
     p-3

  `}
  img {
    ${tw`
      h-10
      w-10
      mx-auto
      my-auto
      fill-current
      text-white
    `}
  }
`
const Username = styled.div`
  ${tw`
    lg:text-lg
    text-base
    font-bold
    capitalize
    text-[#102c6fdf]
`}
`
const Age = styled.div`
  ${tw`
      text-sm
    lg:text-base
    text-[#102c6f]
    font-medium
      mb-5
`}
`
const Gender = styled.div`
  ${tw`
    text-sm
    text-gray-500
    font-medium
  `}
`

const MiddleText = styled.div`
  ${tw`
    text-sm
    lg:text-base
    text-gray-600
    font-medium
    w-full
  `}
`
const BaseText = styled.div`
  ${tw`
    flex
    mt-5
    items-center
  `}
`
const Dot = styled.div`
  ${tw`
      h-1
      w-1
      rounded-full
      bg-gray-400
      mx-2
  `}
`
export const RegDate = styled.div`
  ${tw`
  md:text-sm
  text-xs
  font-normal
  text-gray-400
  italic
  `}
`
const PatientID = styled.div`
  ${tw`
  md:text-sm
  text-xs
  font-normal
  text-gray-400
  `}
`
const PatientCard = ({
  id,
  public_id,
  username,
  sex,
  age,
  DOB,
  tel,
  email,
  region,
  city,
  dateRegisted,
}) => {
  const [isHover, setIsHovered] = useState(false)
  const [isOpen, setIsDialogOpen] = useState(false)
  return (
    <Paper
      className='py-6 px-6 h-fit relative'
      elevation={isHover ? 0 : 8}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <div className='flex flex-col gap-1'>
          <Avatar
            aria-label='patient'
            className={`w-fit ${
              sex === 'male' ? 'bg-[#102c6fdf]' : 'bg-[#49b267]'
            }`}
          >
            {sex === 'male' ? (
              <img src={Male} alt={sex} />
            ) : (
              <img src={Female} alt={sex} />
            )}
          </Avatar>
          <Username>{username}</Username>
          <Gender>{sex}</Gender>
        </div>

        <EditIcon icon='bxs:edit' onClick={() => setIsDialogOpen(true)} />
      </CardHeader>
      <Age>
        Age <span className='underline decoration-[#102c6f]'>{age}</span> Born
        on <span className='underline decoration-[#102c6f]'>{DOB}</span>
      </Age>
      <div className='flex flex-col gap-1'>
        <MiddleText className='group'>
          <strong className='text-[#102c6fdf]'>email</strong>{' '}
          <span className='group-hover:underline group-hover:decoration-[#102c6f]'>
            {email}
          </span>
        </MiddleText>
        <MiddleText className='group'>
          <strong className='text-[#102c6fdf]'>tel</strong>{' '}
          <span className='group-hover:underline group-hover:decoration-[#102c6f]'>
            {formatTelNumber(tel)}
          </span>
        </MiddleText>
        <MiddleText className='group'>
          <strong className='text-[#102c6fdf]'>region</strong>{' '}
          <span className='group-hover:underline group-hover:decoration-[#102c6f]'>
            {region}
          </span>
        </MiddleText>
        <MiddleText className='group'>
          <strong className='text-[#102c6fdf]'>city</strong>{' '}
          <span className='group-hover:underline group-hover:decoration-[#102c6f]'>
            {city}
          </span>
        </MiddleText>
      </div>

      <BaseText>
        <PatientID>{public_id}</PatientID>
        <Dot />
        <RegDate>
          reg <span className='italic'>{dateRegisted}</span>
        </RegDate>
      </BaseText>
      <div className='absolute right-[6%] bottom-[18%]'>
        <Link to={`/patient/${public_id}`}>
          <ActionButton color={'#f6854e'} hoverColor='#f0783d'>
            view
          </ActionButton>
        </Link>
      </div>
      {/* dialog */}
      <EditPatientDialog
        id={public_id}
        isOpen={isOpen}
        setIsOpen={setIsDialogOpen}
      />
    </Paper>
  )
}

PatientCard.propTypes = {
  id: PropTypes.number.isRequired,
  public_id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  DOB: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  dateRegisted: PropTypes.string.isRequired,
}
export default PatientCard
