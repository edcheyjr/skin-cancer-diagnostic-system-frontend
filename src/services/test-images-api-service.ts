import { getStorageItem } from '../helpers/utils'
interface Image {
  test_id: string | undefined
  localization: string | undefined
  imageBase64: string | undefined
}
// define headers

const user = getStorageItem('user')
const token = `Bearer ${user.item.Authorization}`
console.log('token', token)

const headers = new Headers({
  Authorization: token,
  'Content-Type': 'application/json',
})

const URL = `${process.env.REACT_APP_BASE_URI}/images`
// post a patient
export const postImage = async (image: Image) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(image),
  })
  return response
}
// get all patients
export const getAllImages = async () => {
  const response = await fetch(URL, {
    method: 'GET',
    headers: headers,
  })
  return await response.json()
}
