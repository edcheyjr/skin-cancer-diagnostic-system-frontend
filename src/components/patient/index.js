import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import Loading from '../Loading'
import { useQueryClient } from 'react-query'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'
import { getAPatient, updatePatient } from '../../services/patient-api-service'
import {
  updatePatientRecord,
  getAllPatientsRecord,
} from '../../services/tests-api-service'
import AllergySection from './allergys'
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CommonSymptoms from './CommonSymptoms'
import useAuthedQuery from '../../hooks/user-auth-query-hook'
import useAuthedMutation from '../../hooks/use-auth-mutation-hook'
import Button from '../PrimaryButtons'
import {
  FormControl,
  ErrorMessage,
  SuccessMessage,
} from '../dialogs/NewPatientDialog'
import Input from '../Input'
import { formatTelNumber, formatDate } from '../../helpers/utils'
import { CustomDateTimePicker } from '../dialogs/NewPatientDialog'
import PatientTest from './patient-test'

// import svgs
const Female = '/svg/female-avatar.svg'
const Male = '/svg/male-avatar.svg'

const Container = styled.section`
  ${tw`
    container
    mx-auto
    w-full
    mt-8
    min-h-screen
    md:flex
    md:gap-6
    bg-gray-50/40
  `}
`
const RightContainer = styled.section`
  ${tw`
    md:w-1/4
    mb-12
    md:mb-0
    rounded-md
    flex
    flex-col
    gap-6
  `}
`
const LeftContainer = styled.section`
  ${tw`
    md:w-3/4
    px-6
    lg:px-8
    py-8
    rounded-md
    bg-gray-50

  `}
`
const UserDetailsContainer = styled.div`
  ${tw`
    bg-gray-50
    px-6
    lg:px-8
    py-8
    flex
    flex-col
    gap-2
  `}
`
const PatientInfo = styled.div`
  ${tw`
    flex
    justify-between
  `}
`
const LabetText = styled.div`
  ${tw`
  capitalize
  text-gray-400
  font-semibold
  lg:text-base
  md:text-sm
  text-xs
  `}
`
const DataText = styled.div`
  ${tw`
  capitalize
  text-gray-800
  font-semibold
   lg:text-base
  md:text-sm
  text-xs
  `}
`
const AllergiesContainer = styled.div`
  ${tw`
    bg-gray-50
        px-6
    lg:px-8
    py-8
  `}
`
const CommonSyptomsContainer = styled.div`
  ${tw`
    bg-gray-50
    px-6
    py-8
  `}
`
// change the patient status when the doctor makes te diagnosis to inactive
// while those still under testing as active
const PatientStatus = styled.div`
  ${tw`
      font-bold
      lg:text-base
      md:text-sm
      text-xs
      align-middle
  `}
`
const Avatar = styled.div`
  ${tw`
    rounded-md
    p-3
  `}
  img {
    ${tw`
      h-24
      w-24
      mx-auto
      my-auto
      fill-current
      text-white
    `}
  }
`
// const CardHeader = styled.div`
//   ${tw`
//       flex
//       justify-between
//       mb-5
//   `}
// `
const Username = styled.div`
  ${tw`
    lg:text-xl
    text-lg
    font-semibold
    capitalize
    text-[#102c6fdf]
`}
`

const SubTitle = styled.div`
  ${tw`
      uppercase
      text-gray-500
      text-sm
      lg:text-base
      font-medium
      mb-4
  `}
`

const Articles = styled.article`
  ${tw`
    py-1
    mb-8
  `}
`

const PersonDetailsContainer = styled.div`
  ${tw`
      grid
      2xl:grid-cols-4
      lg:grid-cols-3
      md:grid-cols-3
      grid-cols-2
      gap-x-2
      gap-y-6
  `}
`

const ButtonContainer = styled.div`
  ${tw`
  mt-3
  mb-3
  flex
  w-full
  gap-2
`}
`
const LabelContainer = styled.div`
  ${tw`
    flex
    items-center
    gap-2
    w-full
  `}
`
const Label = styled.div`
  ${tw`
      text-sm
      lg:text-base
    font-semibold
    text-gray-400
    capitalize
  `}
`
export const Text = styled.div`
  ${tw`
      text-sm
      lg:text-base
      font-semibold
      capitalize
      text-black
    `}
`
const EditIcon = styled(Icon)`
  ${tw`
      w-4
      h-4
      fill-current
      text-gray-400
      cursor-pointer
      hover:text-[#102c6f]
  `}
`
const ResultContainer = styled.div`
  ${tw`
    my-4
    grid
    md:grid-cols-2
    grid-cols-1
    gap-x-6
    gap-y-6
`}
`

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  }
}

const PatientRecord = () => {
  // update states
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [gender, setGender] = useState('')
  const [DOB, setDOB] = useState(new Date())
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [errorMessage, setError] = useState('')
  const [success, setSuccess] = useState('')

  // update states for patient record
  const [testresult, setTestResult] = useState('')
  const [docdiagnosis, setDocDiagonsis] = useState('')
  const [docrec, setDocRec] = useState('')
  const [recordsErrMessage, setRecordsErrMessage] = useState('')
  const [updatesuccess, setUpdateSuccess] = useState('')

  // edit checks
  const [isFirstnmEdit, setFirstnameEdit] = useState(false)
  const [isLastnameEdit, setLastnameEdit] = useState(false)
  const [isEmailEdit, setEmailEdit] = useState(false)
  const [isTelEdit, setTelEdit] = useState(false)
  const [isGenderEdit, setGenderEdit] = useState(false)
  const [isDOBEdit, setDOBEdit] = useState(false)
  const [isCityEdit, setCityEdit] = useState(false)
  const [isRegionEdit, setRegionEdit] = useState(false)
  const [isTestResultEdit, setTestResultEdit] = useState('')
  const [isDocDiagnosisEdit, setDocDiagnosisEdit] = useState('')
  const [isDocRecEdit, setDocRecEdit] = useState('')
  const theme = useTheme()

  const [value, setValue] = useState(0)

  // querying patient data
  const { patient_id } = useParams()
  console.log('patient_id', patient_id)
  const queryClient = useQueryClient()
  const { isLoading, isError, error, data, isSuccess } = useAuthedQuery(
    ['patients', patient_id],
    () => getAPatient(patient_id),
    {
      onSuccess: (data) => {
        console.log('data', data)
        queryClient.setQueryData(['patients', data.public_id], data)
      },
    }
  )

  const patient = queryClient.getQueryData(['patients', patient_id])
  const namesArr = data?.name.split(' ') || patient?.name.split(' ')
  const handleUpdateCancel = () => {
    setFirstnameEdit(false)
    setLastnameEdit(false)
    setEmailEdit(false)
    setTelEdit(false)
    setGenderEdit(false)
    setDOBEdit(false)
    setCityEdit(false)
    setRegionEdit(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const { mutate, status } = useAuthedMutation(updatePatient, {
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
  // handle updates
  const handlePatientUpdate = () => {
    if (firstname == '') {
      setFirstname(namesArr[0])
    }
    if (lastname == '') {
      setLastname(namesArr[1])
    }
    if (email == '') {
      setEmail(data.email || patient.email)
    }
    if (tel === '') {
      setTel(data.tel || patient.tel)
    }
    if (gender == '') {
      setGender(data.sex)
    }
    if (region == '') {
      setRegion(data.region)
    }
    if (city == '') {
      setCity(data.city)
    }
    const PatientEditedRecords = {
      name: `${firstname} ${lastname}`,
      email,
      tel,
      DOB: formatDate(DOB),
      sex: gender,
      city,
      region,
    }
    console.log('PatientEditedRecords', PatientEditedRecords)
    mutate(
      { id: patient_id, patient: PatientEditedRecords },
      {
        onSuccess: async (response) => {
          const data = await response.json()
          if (data.status === 'success') {
            setFirstnameEdit(false)
            setLastnameEdit(false)
            setEmailEdit(false)
            setTelEdit(false)
            setGenderEdit(false)
            setDOBEdit(false)
            setCityEdit(false)
            setRegionEdit(false)
            setSuccess(data.message)
          } else {
            setError(data.message)
          }
        },
      }
    )
  }
  // querying patient data
  const query = useAuthedQuery(['patientsRecord'], getAllPatientsRecord, {
    onSuccess: (data) => {
      queryClient.setQueryData(['patientsRecord'], data)
    },
  })
  // let query_data = query.data
  let patient_record = queryClient.getQueryData('patientsRecord')
  // if (patient_record) {
  //   console.log('patient_record', patient_record)
  // }
  if (query.isLoading) {
    console.log('patient record is loading')
  }

  // update test record mutation
  const mutateRecord = useAuthedMutation(updatePatientRecord, {
    onMutate: async (newPatient) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('patientsRecord')
      // Snapshot the previous value
      const previousRecord = queryClient.getQueryData('patientsRecord')
      // Optimistically update to the new value
      queryClient.setQueryData('patientsRecord', (old) => [...old, newPatient])

      // Return a context object with the snapshotted value
      return { previousRecord }
    },
  })

  //timeout reset setError or setSuccess
  setTimeout(() => {
    setSuccess('')
    setError('')
  }, 30000)
  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (query.isSuccess) {
    let past_test_records = patient_record.filter(
      (item) => item.status !== 'active'
    )
    let patient_test_obj = patient_record.find(
      (item) => item.status === 'active'
    )

    // cancel update patient record
    const handleCancelResult = () => {
      setDocDiagnosisEdit(false)
      setTestResultEdit(false)
      setDocRecEdit(false)
    }

    // handle update patient record
    const handleTestRecordUpdate = () => {
      const TestUpdate = {
        test_name: patient_test_obj.test_name,
        test_description: patient_test_obj.test_description,
        test_result: '',
        doc_diagnosis: '',
        doc_recommendation: '',
      }
      mutateRecord.mutate(
        { id: patient_test_obj.test_id, diagnosis: TestUpdate },
        {
          onSuccess: async (response, variable, context) => {
            const data = await response.json()
            if (
              response.status === 201 ||
              response.status === 200 ||
              data.status === 'success'
            ) {
              setUpdateSuccess(data.message)
              queryClient.invalidateQueries('patientsRecord')
            } else {
              setRecordsErrMessage(data.message)
            }
          },
          onError: async (err, variables, context) => {
            queryClient.setQueryData('patientsRecord', context.previousRecord)
            setError(err)
            console.log('Error while updating...', err)
            console.log('data sent is', variables)
          },
          onSettled: async () => {
            queryClient.invalidateQueries('patientsRecord')
          },
        }
      )
    }

    return (
      <Container>
        <RightContainer>
          <UserDetailsContainer>
            <div className='flex flex-col gap-1 mb-2'>
              <Avatar
                aria-label='patient'
                className={`w-fit ${
                  patient.sex === 'male' ? 'bg-[#102c6fdf]' : 'bg-[#49b267]'
                }`}
              >
                {patient.sex === 'male' ? (
                  <img src={Male} alt={data.sex || patient.sex} />
                ) : (
                  <img src={Female} alt={data.sex || patient.sex} />
                )}
              </Avatar>
              <Username>{data.name || patient.name}</Username>
              {patient_test_obj && (
                <PatientStatus
                  className={
                    patient_test_obj.status === 'active'
                      ? 'text-[#49b267]'
                      : 'text-[#f6854e]'
                  }
                >
                  {patient_test_obj.status || 'unactive'}
                </PatientStatus>
              )}
            </div>
            <PatientInfo>
              <LabetText>gender</LabetText>
              <DataText>{data.sex || patient.sex}</DataText>
            </PatientInfo>
            <PatientInfo>
              <LabetText>age</LabetText>
              <DataText>{data.age || patient.age}</DataText>
            </PatientInfo>
            <PatientInfo>
              <LabetText>height</LabetText>
              <DataText>176 cm</DataText>
            </PatientInfo>
            <PatientInfo>
              <LabetText>weight</LabetText>
              <DataText>67 kg</DataText>
            </PatientInfo>
          </UserDetailsContainer>
          <AllergiesContainer>
            <AllergySection />
          </AllergiesContainer>
          <CommonSyptomsContainer>
            <CommonSymptoms />
          </CommonSyptomsContainer>
        </RightContainer>
        <LeftContainer>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='action tabs example'
          >
            <Tab label='General' {...a11yProps(0)} />
            <Tab label='Past Record' {...a11yProps(1)} />
          </Tabs>

          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            style={{
              fontFamily: 'montserrat',
            }}
          >
            <Articles>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              {success && <SuccessMessage>{success}</SuccessMessage>}
              <SubTitle>Patient details</SubTitle>
              <PersonDetailsContainer>
                <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                  <LabelContainer>
                    <Label>Last name</Label>
                    <EditIcon
                      icon='ant-design:edit-outlined'
                      onClick={() => setLastnameEdit(true)}
                    />
                  </LabelContainer>
                  {isLastnameEdit ? (
                    <Input
                      type='text'
                      value={lastname}
                      setValue={setLastname}
                      label={namesArr[1]}
                    />
                  ) : (
                    <Text>{namesArr[1]}</Text>
                  )}
                </FormControl>
                <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                  <LabelContainer>
                    <Label>First name</Label>

                    <EditIcon
                      icon='ant-design:edit-outlined'
                      onClick={() => setFirstnameEdit(true)}
                    />
                  </LabelContainer>
                  {isFirstnmEdit ? (
                    <Input
                      type='text'
                      value={firstname}
                      label={namesArr[0]}
                      setValue={setFirstname}
                    />
                  ) : (
                    <Text>{namesArr[0]}</Text>
                  )}
                </FormControl>
                <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                  <LabelContainer>
                    <Label>Birth Date</Label>
                    <EditIcon
                      icon='ant-design:edit-outlined'
                      onClick={() => setDOBEdit(true)}
                    />
                  </LabelContainer>
                  {isDOBEdit ? (
                    <CustomDateTimePicker
                      value={new Date(data.DOB)}
                      onChange={setDOB}
                    />
                  ) : (
                    <Text>{data.DOB || patient.DOB}</Text>
                  )}
                </FormControl>
                <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                  <LabelContainer>
                    <Label>Gender</Label>
                    <EditIcon
                      icon='ant-design:edit-outlined'
                      onClick={() => setGenderEdit(true)}
                    />
                  </LabelContainer>
                  {isGenderEdit ? (
                    <Input
                      type='select'
                      value={gender}
                      setValue={setGender}
                      defaultValue={data.sex}
                      options={['male', 'female']}
                    />
                  ) : (
                    <Text>{data.sex || patient.sex}</Text>
                  )}
                </FormControl>
                <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                  <LabelContainer>
                    <Label>Email</Label>
                    <EditIcon
                      icon='ant-design:edit-outlined'
                      onClick={() => setEmailEdit(true)}
                    />
                  </LabelContainer>
                  {isEmailEdit ? (
                    <Input
                      type={'email'}
                      label={data.email}
                      value={email}
                      setValue={setEmail}
                    />
                  ) : (
                    <Text>{data.email || patient.email}</Text>
                  )}
                </FormControl>
                <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                  <LabelContainer>
                    <Label>Tel</Label>
                    <EditIcon
                      icon='ant-design:edit-outlined'
                      onClick={() => setTelEdit(true)}
                    />
                  </LabelContainer>
                  {isTelEdit ? (
                    <Input
                      type='tel'
                      label={data.tel || patient.tel}
                      value={tel}
                      setValue={setTel}
                    />
                  ) : (
                    <Text>{formatTelNumber(data.tel || patient.tel)}</Text>
                  )}
                </FormControl>
                <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                  <LabelContainer>
                    <Label>Region</Label>
                    <EditIcon
                      icon='ant-design:edit-outlined'
                      onClick={() => setRegionEdit(true)}
                    />
                  </LabelContainer>
                  {isRegionEdit ? (
                    <Input
                      type='text'
                      label={data.region}
                      value={region}
                      setValue={setRegion}
                    />
                  ) : (
                    <Text>{data.region || patient.region}</Text>
                  )}
                </FormControl>
                <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                  <LabelContainer>
                    <Label>City</Label>
                    <EditIcon
                      icon='ant-design:edit-outlined'
                      onClick={() => setCityEdit(true)}
                    />
                  </LabelContainer>
                  {isCityEdit ? (
                    <Input
                      type='text'
                      label={data.city}
                      value={city}
                      setValue={setCity}
                    />
                  ) : (
                    <Text>{data.city || patient.city}</Text>
                  )}
                </FormControl>
              </PersonDetailsContainer>

              {isFirstnmEdit ||
              isLastnameEdit ||
              isEmailEdit ||
              isTelEdit ||
              isGenderEdit ||
              isDOBEdit ||
              isCityEdit ||
              isRegionEdit ? (
                <ButtonContainer>
                  <Button
                    color='#f6854e'
                    hoverColor='#f0783d'
                    variant='contained'
                    type='button'
                    onClick={handlePatientUpdate}
                  >
                    make changes
                  </Button>
                  <Button
                    variant='outlined'
                    color='#102c6fdf'
                    hoverColor={'#102c6f'}
                    onClick={handleUpdateCancel}
                  >
                    cancel
                  </Button>
                </ButtonContainer>
              ) : (
                <></>
              )}
            </Articles>
            <Articles>
              <SubTitle>TEST</SubTitle>
              {patient_test_obj ? (
                <PatientTest
                  test_id={patient_test_obj.test_id}
                  patient_id={patient_test_obj.patient_id}
                  test_name={patient_test_obj.test_name}
                  test_description={patient_test_obj.test_description}
                  status={patient_test_obj.status}
                  date_modified={patient_test_obj.date_modified}
                />
              ) : (
                <Text>No Added Patient Test Yet</Text>
              )}
            </Articles>
            <Articles>
              <SubTitle>DOCTOR'S RESULTS</SubTitle>
              {patient_test_obj ? (
                <>
                  <ResultContainer>
                    <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                      <LabelContainer>
                        <Label>test result</Label>
                        <EditIcon
                          icon='ant-design:edit-outlined'
                          onClick={() => setTestResultEdit(true)}
                        />
                      </LabelContainer>
                      {isTestResultEdit ? (
                        <Input
                          type='text'
                          value={testresult}
                          setValue={setTestResult}
                          label={
                            patient_test_obj.test_result || 'add a test result'
                          }
                        />
                      ) : (
                        <Text>
                          {patient_test_obj.test_result || 'add a test result'}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                      <LabelContainer>
                        <Label>doctor diagnosis</Label>
                        <EditIcon
                          icon='ant-design:edit-outlined'
                          onClick={() => setDocDiagnosisEdit(true)}
                        />
                      </LabelContainer>
                      {isDocDiagnosisEdit ? (
                        <Input
                          type='text'
                          value={docdiagnosis}
                          setValue={setDocDiagonsis}
                          label={'write a diagnosis'}
                        />
                      ) : (
                        <Text>
                          {patient_test_obj.doc_diagnosis ||
                            'write a diagnosis'}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl className='hover:shadow-md hover:shadow-[#f6854e]/30 py-1 px-2'>
                      <LabelContainer>
                        <Label>doctor recommendation & prescription</Label>
                        <EditIcon
                          icon='ant-design:edit-outlined'
                          onClick={() => setDocRecEdit(true)}
                        />
                      </LabelContainer>
                      {isDocRecEdit ? (
                        <Input
                          type='text'
                          value={docrec}
                          setValue={setDocRec}
                          label={
                            patient_test_obj.doc_recommendation ||
                            'add a prescription'
                          }
                        />
                      ) : (
                        <Text>
                          {patient_test_obj.doc_recommendation ||
                            "'add a prescription'"}
                        </Text>
                      )}
                    </FormControl>
                  </ResultContainer>
                  {isTestResultEdit || isDocDiagnosisEdit || isDocRecEdit ? (
                    <ButtonContainer>
                      <Button
                        color='#f6854e'
                        hoverColor='#f0783d'
                        variant='contained'
                        type='button'
                        onClick={handleTestRecordUpdate}
                      >
                        {mutateRecord.isLoading
                          ? 'submiting...'
                          : 'submit result'}
                      </Button>
                      <Button
                        variant='outlined'
                        color='#102c6fdf'
                        hoverColor={'#102c6f'}
                        onClick={handleCancelResult}
                      >
                        cancel
                      </Button>
                    </ButtonContainer>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <Text>No Added Patient Test Yet</Text>
              )}
            </Articles>
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            style={{ fontFamily: 'montserrat' }}
          >
            {past_test_records ? (
              past_test_records.map((record, key) => (
                <PatientTest
                  key={key}
                  test_id={record.test_id}
                  patient_id={record.patient_id}
                  test_name={record.test_name}
                  test_description={record.test_description}
                  status={record.status}
                  test_result={record.test_result}
                  doc_diagnosis={record.doc_diagnosis}
                  doc_recommendation={record.doc_recommendation}
                  date_modified={record.date_modified}
                />
              ))
            ) : (
              <>no past records yet</>
            )}
          </TabPanel>
          {/* </AppBar> */}
        </LeftContainer>
      </Container>
    )
  }
}
export default PatientRecord
