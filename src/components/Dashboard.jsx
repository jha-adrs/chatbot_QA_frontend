import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from './DataTable'
import config from '../config/config'
import axios from 'axios'
const Dashboard = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    document.title = "Dashboard"
    setIsLoading(true)
    const accessToken = localStorage.getItem('accessToken')
    console.log(typeof accessToken)
    if(accessToken){
      console.log("Access token found")
      // Fetching too many times
      axios.get(`${config.SERVER_URL}/api/fetch/try_question`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(res => {
        console.log(res)
        setQuestions(res)
      })
      .catch(err => {
        console.log(err)
        navigate('/login')
      })
    }
    else{
      console.log("No access token")
      navigate('/login');
    }
    setIsLoading(false)
  })

  return (
    <div className='flex'>
      <DataTable questions={questions}/>
    </div>
  )
}

export default Dashboard
