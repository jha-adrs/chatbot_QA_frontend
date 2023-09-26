import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AppContext from './context/contextProvider'
function App() {
  return (
    <AppContext>
      <Navbar />
      <Dashboard />
    </AppContext>
  )
}

export default App
