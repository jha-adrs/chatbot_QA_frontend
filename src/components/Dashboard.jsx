import React, { useEffect, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import DataTable from './DataTable'
import config from '../config/config'
import axios from 'axios'
import Context from '../context/context'
const Dashboard = (props) => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { category, setCategory } = context;
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    document.title = "Dashboard"
    setIsLoading(true)
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      console.log("Access token found")
      axios.get(`${config.SERVER_URL}/api/fetch/${category}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: {
          limit: 10,
          offset: offset
        }
      })
        .then(res => {
          console.log(res)
          setOffset(offset + 10)
          setQuestions(res.data)
          setIsLoading(false) // move setIsLoading(false) inside the then block
        })
        .catch(err => {
          console.log(err)
          navigate('/login')
          setIsLoading(false) // move setIsLoading(false) inside the catch block
        })
    }
    else {
      console.log("No access token")
      navigate('/login');
      setIsLoading(false) // move setIsLoading(false) inside the else block
    }
  }, [])

  return (<>
    
    <div className='flex border-2 rounded-lg mt-11 '>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable questions={questions} category={category} />
      )}
    </div>
  </>
  )
}

export default Dashboard