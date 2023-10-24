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
import {inject} from '@vercel/analytics';
import About from './components/About';
import Navbar from './components/Navbar';
import { AppContextProvider } from './context/context';
import Answered from './components/questions/Answered';
import UserAnswered from './components/questions/UserAnswered';
import OTPVerification from './components/OTPVerification';
import Chatbot from './components/questions/Chatbot';
import SelectionPage from './components/SelectionPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: localStorage.getItem('accessToken')?<SelectionPage />:<Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/dashboard',
    element: <App />

  },
  {
    path: '/about',
    element: <><Navbar/><About /></>
  },
  {
    path: '/answered',
    element: <><Navbar/><Answered /></>
  },
  {
    path: '/useranswered',
    element: <><Navbar/><UserAnswered /></>
  },
  {
    path: '/verifyemail',
    element: <><OTPVerification /></>
  },
  {
    path: '/chat',
    element: <Chatbot />
  },{
    path: '/select',
    element: <SelectionPage />
  }
  
  
]);
inject();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
    <RouterProvider router={router} />
    </AppContextProvider>
    
  </React.StrictMode>,
)
