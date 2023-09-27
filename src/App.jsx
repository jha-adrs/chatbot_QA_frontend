import { useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import { AppContextProvider } from './context/context';
import { useAppContext } from './context/context';
import config from './config/config'
function App() {

  
  return (
    <AppContextProvider>
      <Navbar />
      <Dashboard  />
    </AppContextProvider>
  )
}

export default App
