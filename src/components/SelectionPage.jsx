import React from 'react'
// Gives options to select chatbot or QnA
import { Bot, PenBoxIcon } from 'lucide-react'

import {  useNavigate } from 'react-router-dom'

const SelectionPage = () => {
    const navigate = useNavigate();
    
  return (
    <div className='w-full h-full border-2 border-gray-600 rounded-xl p-10 bg-zinc-900'>
        <h1 className='text-white font-bold'>
            Where do you wish to navigate?
        </h1>
        <h2 className="text-gray-500 font-semibold m-2">Hey! Wanna checkout our new VIT chatbot? </h2>
        <div className='flex justify-center '>
            <button className='flex flex-col sm:flex-row h-fit bg-red-500 hover:bg-red-700 text-white font-bold my-2 mx-4 rounded-lg m-4' onClick={()=>navigate('/chat')}>
                <Bot size={25} className='hidden sm:inline-block mx-2' /> <span className='align-center'>Chatbot</span>
            </button>
            <button className='flex flex-col sm:flex-row h-fit bg-green-500 hover:bg-green-700 text-white font-bold my-2 mx-4 rounded-lg m-4' onClick={()=>navigate('/dashboard')}>
                <PenBoxIcon size={25} className='hidden sm:inline-block mx-2' /> <span className=''>QnA</span>
                
            </button>
            </div>
    </div>
  )
}

export default SelectionPage
