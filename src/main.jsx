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
import { inject } from '@vercel/analytics';
import About from './components/About';
import Navbar from './components/Navbar';
import { AppContextProvider } from './context/context';
import Answered from './components/questions/Answered';
import UserAnswered from './components/questions/UserAnswered';
import OTPVerification from './components/OTPVerification';
import Chatbot from './components/questions/Chatbot';
import SelectionPage from './components/SelectionPage';
import Chatbotv2 from './components/questions/Chatbotv2.jsx';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ToastProvider } from '@radix-ui/react-toast';
import Loginv2 from './components/Loginv2.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: localStorage.getItem('accessToken') ? <Chatbotv2 /> : <Login />,
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
    element: <><Navbar /><About /></>
  },
  {
    path: '/answered',
    element: <><Navbar /><Answered /></>
  },
  {
    path: '/useranswered',
    element: <><Navbar /><UserAnswered /></>
  },
  {
    path: '/verifyemail',
    element: <><OTPVerification /></>
  },
  {
    path: '/chat',
    element: <Chatbotv2 />
  }, {
    path: '/select',
    element: <SelectionPage />
  },
  {
    path: '/loginv2',
    element: <Loginv2 />,
  
  }


]);
inject();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <ToastProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ToastProvider>
    </AppContextProvider>

  </React.StrictMode>,
)
