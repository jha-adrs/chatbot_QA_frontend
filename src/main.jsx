import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
const router = createBrowserRouter([
  {
    path:'/',
    element: <Login />,
    errorElement: <NotFound />,
  },
      {
        path:'/login',
        element: <Login />
      },
      {
        path:'/signup',
        element: <Signup />
      },
      {
        path:'/dashboard',
        element: <Dashboard />

      }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
