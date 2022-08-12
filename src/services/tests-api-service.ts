import { getStorageItem } from '../helpers/utils'

// define types of the api
interface Diagnosis {
  test_name: string | undefined
  test_desc: string | undefined
  test_result: string | undefined
  doc_diagnosis: string | undefined
  doc_recommendation: string | undefined
}

interface EditDiagnosis {
  id: string
  diagnosis: Diagnosis
}
// define headers

const user = getStorageItem('user')
const token = `Bearer ${user.item.Authorization}`

const headers = new Headers({
  Authorization: token,
  'Content-Type': 'application/json',
})

const URL = `${process.env.REACT_APP_BASE_URI}/patient/tests`

// post a patient
export const postPatientRecord = async (diagnosis: Diagnosis) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(diagnosis),
  })
  return response
}
// get all patients
export const getAllPatientsRecord = async () => {
  const response = await fetch(URL, {
    headers: headers,
  })
  return await response.json()
}
// get a single patient
export const getAPatientRecord = async (id: string, status: string) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'GET',
    headers: headers,
    body: JSON.stringify({ status: status }),
  })
  return await response.json()
}
// update a patient
export const updatePatientRecord = async ({ id, diagnosis }: EditDiagnosis) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(diagnosis),
  })
  return response
}
// delete a patient TODO later
export const deletePatientRecord = async (id: string) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  return response
}
