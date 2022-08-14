import { rejects } from 'assert'

// gets storageItem from localStorage if their is any item
export const getStorageItem = (item: string) => {
  let storageItem
  storageItem = localStorage.getItem(item)
  if (storageItem) {
    storageItem = JSON.parse(storageItem)
  } else {
    storageItem = []
  }
  return storageItem
}

// setting the localstorage with data
export const setStorageItem = (name: string, item: any) => {
  localStorage.setItem(name, JSON.stringify(item))
}

export function setStorageItemWithExpiry(name: string, item: any, ttl: number) {
  const now = new Date()

  // `item` is an object which contains the original item
  // as well as the time when it's supposed to expire
  const value = {
    item: item,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(name, JSON.stringify(value))
}

export function getStorageItemWithExpiry(name: string) {
  const itemStr = localStorage.getItem(name)
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(name)
    return item
  }
  return item.item
}

// remove item from localstorage
export function removeItemFromStorage(name: string) {
  localStorage.removeItem(name)
  return null
}

// custom history object to allow navigation outside react components
export const history = {
  navigate: null,
  location: null,
}
// format telephones numbers
export function formatTelNumber(no: string) {
  const noArr = no.split('')

  if (noArr.length === 10) {
    const partOne = noArr[0] + noArr[1] + noArr[2] + noArr[3]
    const partTwo = noArr[4] + noArr[5] + noArr[6]
    const partThree = noArr[7] + noArr[8] + noArr[9]
    // store individual string to an array the use the array of string sto from
    const tel = `${partOne}-${partTwo}-${partThree}`
    return tel
  }
  return no
}

export function formatDate(date: Date) {
  const dateArr = date.toString().split(' ')
  let formattedDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[3]} ${dateArr[4]}`
  return formattedDate
}
export function mapLabelToFullDiseaseName(label: string) {
  const label_map = ['nv', 'mel', 'bkl', 'bcc', 'akiec', 'vasc', 'df']
  if (label === label_map[0]) {
    return 'melanocytic nevi'
  }
  if (label === label_map[1]) {
    return 'melanoma'
  }
  if (label === label_map[2]) {
    return 'benign keratosis-like lesions (solar lentigines / seborrheic keratoses and lichen-planus like keratoses'
  }
  if (label === label_map[3]) {
    return 'basal cell carcinoma'
  }
  if (label === label_map[4]) {
    return "Actinic keratoses and intraepithelial carcinoma / Bowen's disease"
  }
  if (label === label_map[5]) {
    return 'vascular lesions'
  }
  if (label === label_map[6]) {
    return 'dermatofibroma'
  }
  return 'health skin'
}

export function formatConfidenceToPercentage(confidence: string) {
  let float_conf = parseFloat(confidence).toFixed(2)
  return `${float_conf}%`
}

export function formatScoreToArray(score: string) {
  const label_map = ['nv', 'mel', 'bkl', 'bcc', 'akiec', 'vasc', 'df']
  const newScoreArr = new Array()
  let scoreArr = score.split(' ')
  scoreArr.forEach((scr, key) => {
    const percentage_scr = formatStringDecimalToPercentage(scr)
    newScoreArr.push({
      conf: percentage_scr,
      label: label_map[key],
    })
  })
  return newScoreArr
}

function formatStringDecimalToPercentage(a: string) {
  let float = parseFloat(a)
  let percentage = float * 100
  return percentage.toFixed(2)
}

export function convertFileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.onerror = (error) => reject(error)
    reader.onabort = () => {
      console.log('aborted...')
    }
  })
}
