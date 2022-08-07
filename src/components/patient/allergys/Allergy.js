import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Icon } from '@iconify/react'
import PropTypes from 'prop-types'
import { getStorageItem, setStorageItem } from '../../../helpers/utils'

const AllergyInfo = styled.div`
  ${tw`
      flex
      justify-between
  `}
`
const AllergyType = styled.div`
  ${tw`
    capitalize
    text-gray-800
    font-semibold
    lg:text-base
    md:text-sm
    text-xs
  `}
`
const LevelOfSeverity = styled.div`
  ${tw`
    capitalize
    lg:text-base
    md:text-sm
    text-xs
    font-semibold
`}
`
const RemoveAllergy = styled(Icon)`
  ${tw`
    h-6
    w-6
    fill-current
    text-gray-500
    cursor-pointer
`}
`
const Allergy = ({ allergy, id }) => {
  const allergys = getStorageItem('allergys')
  const [isHovered, setIsHovered] = useState(false)
  const newAllergys = allergys.filter((allergy, key) => key !== id)
  const handleRemoveItem = () => {
    setStorageItem('allergys', newAllergys)
  }
  console.log('severity', allergy.severity)
  let color = 'text-gray-400'
  if (allergy.severity.toLowerCase() == 'high') {
    color = 'text-red-500'
  } else if (allergy.severity.toLowerCase() == 'medium') {
    color = 'text-[#f6854e]'
  } else if (allergy.severity.toLowerCase() == 'low') {
    color = 'text-[#49b267]'
  } else {
  }
  return (
    <AllergyInfo
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AllergyType>{allergy.allergy}</AllergyType>
      <div className='flex gap-2'>
        <LevelOfSeverity className={color}>{allergy.severity}</LevelOfSeverity>
        {isHovered && (
          <RemoveAllergy icon='carbon:close' onClick={handleRemoveItem} />
        )}
      </div>
    </AllergyInfo>
  )
}

Allergy.propTypes = {
  allergy: PropTypes.shape({
    allergy: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
}

export default Allergy
