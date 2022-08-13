import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import style from 'styled-components'
import tw from 'twin.macro'
import {
  formatConfidenceToPercentage,
  formatScoreToArray,
  mapLabelToFullDiseaseName,
} from '../../../helpers/utils'

const Localization = style.div`${tw`
    rounded-md
    bg-gray-50
    font-semibold
    text-center
    align-middle
    text-[#102C6F]
    lowercase
    absolute
    top-4
    right-4
    px-1.5
    py-0.5
    shadow-lg
`}`
const LabelText = style.div`
  ${tw`
    text-sm
    lg:text-base
    font-semibold
    text-gray-400
    capitalize
  `}
`
const ClassficationText = style.div`
${tw`
    text-sm
    lg:text-base
    font-semibold
    text-[#102C6F]
    capitalize
`}`

const Confidence = style.div`
  ${tw`
    rounded-md
    bg-[#49B267]
    text-sm
    font-bold
    lowercase
    py-2
    px-2
    w-auto
    h-10
    text-white
  `}
`
const InfoContainer = style.div`${tw`
    flex
    gap-2
  
`}`
const ClassficationBar = style.div`
${tw`
  flex
`}`
const ClassficationLabel = style.div`${tw`
  w-1/4
  text-gray-800
  text-sm
  lg:text-base
  font-medium
`}`
const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const TestImageCard = ({
  id,
  image_id,
  test_id,
  image_url,
  localization,
  classification,
  confidence,
  date_modified,
  scores,
}) => {
  const [expanded, setExpanded] = React.useState(false)
  console.log('id', id)
  console.log('image_id', image_id)
  console.log('test_id', test_id)
  console.log('date_modified', date_modified)
  const formattedScoreArr = formatScoreToArray(scores)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }} elevation={3}>
      <Localization>{localization}</Localization>
      <CardMedia component='img' height='90' image={image_url} alt='image' />
      <CardContent>
        <div className='flex justify-between'>
          <div>
            <InfoContainer>
              <LabelText>type found &gt;</LabelText>
              <ClassficationText>{classification}</ClassficationText>
            </InfoContainer>
            <InfoContainer>
              <LabelText>localization &gt;</LabelText>
              <ClassficationText>{localization}</ClassficationText>
            </InfoContainer>
          </div>
          <Confidence>{formatConfidenceToPercentage(confidence)}</Confidence>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <LabelText>MODEL CLASSIFICATIONS</LabelText>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {/*  */}
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <div className='flex flex-col gap-2'>
            {formattedScoreArr.map((item, key) => (
              <ClassficationBar key={key}>
                <ClassficationLabel title={classification} key={key}>
                  {item.label}
                </ClassficationLabel>

                <div className='w-3/4 bg-gray-200 rounded-full h-fit' key={key}>
                  <div
                    key={key}
                    className={`${
                      item.conf >= 75
                        ? 'bg-[#24f0ce]'
                        : item.conf <= 74 && item.conf >= 50
                        ? 'bg-[#49b267]'
                        : item.conf <= 49 && item.conf >= 29
                        ? 'bg-orange-500'
                        : 'bg-red-600'
                    } text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full `}
                    style={{ width: `${item.conf}%` }}
                    title={`${item.conf}%`}
                  >
                    {item.conf}%
                  </div>
                </div>
              </ClassficationBar>
            ))}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

TestImageCard.propTypes = {
  id: PropTypes.string.isRequired,
  image_id: PropTypes.string.isRequired,
  test_id: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  localization: PropTypes.string.isRequired,
  classfication: PropTypes.string.isRequired,
  confidence: PropTypes.string.isRequired,
  date_modified: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
}

export default TestImageCard
