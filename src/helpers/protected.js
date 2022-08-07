import { Outlet, Navigate } from 'react-router-dom'
import { getStorageItemWithExpiry } from './utils'

export default function ProtectedRoutes() {
  const item = getStorageItemWithExpiry('user')

  return item?.Authorization ? <Outlet /> : <Navigate to='/auth' />
}
