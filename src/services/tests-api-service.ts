import { getStorageItem } from '../helpers/utils'

// define types of the api
interface Patient {
  name: string | undefined
  email: string | undefined
  tel: string | undefined
  DOB: Date | undefined
  sex: string | undefined
  region: string | undefined
  city: string | undefined
}

interface EditPatient {
  id: string
  patient: Patient
}
// define headers

const user = getStorageItem('user')
const token = `Bearer ${user.item.Authorization}`
console.log('token', token)

const headers = new Headers({
  Authorization: token,
  'Content-Type': 'application/json',
})

const URL = `${process.env.REACT_APP_BASE_URI}/patient`

// post a patient
export const postPatient = async (patient: Patient) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(patient),
  })
  return response
}
// get all patients
export const getAllPatients = async () => {
  const response = await fetch(URL, {
    method: 'GET',
    headers: headers,
  })
  return await response.json()
}
// get a single patient
export const getAPatient = async (id: string) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'GET',
    headers: headers,
  })
  return await response.json()
}
// update a patient
export const updatePatient = async ({ id, patient }: EditPatient) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(patient),
  })
  return response
}
// delete a patient TODO later
export const deletePatient = async (id: string) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  return response
}
