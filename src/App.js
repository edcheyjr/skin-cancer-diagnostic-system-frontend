import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './components/Loading'
import ProtectedRoutes from './helpers/protected'
import IsLoggedIn from './helpers/isLoggedin'

// page components
const Auth = lazy(() => import('./pages/auth'))
const Dasboard = lazy(() => import('./pages/dashboard'))
const PatientTestRecords = lazy(() => import('./pages/patient'))
const NotFound = lazy(() => import('./pages/not-found'))

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Dasboard />} />
            <Route
              path='/patient/:patient_id'
              element={<PatientTestRecords />}
            />
          </Route>
          <Route element={<IsLoggedIn />}>
            <Route path='/auth' element={<Auth />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
