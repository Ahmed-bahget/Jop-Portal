import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Logout from './components/auth/Logout'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import ProtectedRoute from './components/admin/ProtectedRoute'

const Companies = lazy(() => import('./components/admin/Companies'))
const CompanySetup = lazy(() => import('./components/admin/CompanySetup'))
const CompanyCreate = lazy(() => import('./components/admin/CompanyCreate').then(module => ({ default: module.CompanyCreate })))
const AdminJobs = lazy(() => import('./components/admin/AdminJobs'))
const PostJob = lazy(() => import('./components/admin/PostJob'))
const Applicants = lazy(() => import('./components/admin/Applicants'))

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
)

const appRouter = createBrowserRouter([
  {
    path:'*',
    element:<Home/>
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/logout',
    element:<Logout/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  // ADMIN ROUTES
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Suspense fallback={<PageLoader/>}><Companies/></Suspense></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><Suspense fallback={<PageLoader/>}><CompanyCreate/></Suspense></ProtectedRoute>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><Suspense fallback={<PageLoader/>}><CompanySetup/></Suspense></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><Suspense fallback={<PageLoader/>}><AdminJobs/></Suspense></ProtectedRoute>
  },
  {
    path:"/admin/create/job",
    element:<ProtectedRoute><Suspense fallback={<PageLoader/>}><PostJob/></Suspense></ProtectedRoute>
  },
  {
    path:"/admin/job/:id/applicants",
    element:<ProtectedRoute><Suspense fallback={<PageLoader/>}><Applicants/></Suspense></ProtectedRoute>
  },
])


function App() {

  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
