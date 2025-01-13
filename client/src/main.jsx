import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// importing of the authcontext
import { AuthProvider } from './routes/AuthContext.jsx'
// routes
import PublicRoute from './routes/PublicRoute.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import RestrictedRoute from './routes/RestrictedRoute.jsx'
// pages
import LandingPage from './pages/LandingPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Authentication from './pages/Authentication.jsx'
import { UserProvider } from "./Usercontext.jsx";


// routes
const router = createBrowserRouter([
  // the landing page section
  {
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/registration', element: <Authentication signin={false} /> }
    ]
  },
  {
    element: <PrivateRoute />,
    children: [
      { path: '/home', element: <HomePage /> }
    ]
  },
  {
    element: <RestrictedRoute />,
    children: [
      { path: '/login', element: <Authentication signin={true} /> }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
)
