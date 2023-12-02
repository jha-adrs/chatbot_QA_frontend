import { Bot } from 'lucide-react'
import Banner from './Banner'
import DataTable from './DataTable'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const router = useNavigate()
  const bannerClosed = localStorage.getItem('bannerClosed') === 'true'
  const [showBanner, setShowBanner] = useState(!bannerClosed&&true)
  const setBannerClosed = () => {
    localStorage.setItem('bannerClosed', true)
    setShowBanner(false)
  }
  return (
    <div className='relative flex border-2 rounded-lg  '> 
    <DataTable />
    {showBanner && (
      <Banner close={setBannerClosed}/>
    )}
    {!showBanner && (
      <button title='Chatbot' onClick={()=>router('/chat')} className="fixed bottom-0 right-0 mb-4 mr-4 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-full">
      <Bot size={32} />
    </button>
    )}
    </div>
  )
}

export default Dashboard