import Banner from './Banner'
import DataTable from './DataTable'
import { useState } from 'react'
const Dashboard = () => {
  const [showBanner, setShowBanner] = useState(true)
  return (
    <div className='flex border-2 rounded-lg mt-11 '> 
    <DataTable />
    {showBanner && (
      <Banner close={() => {
        setShowBanner(false)
      }}/>
    )}
    </div>
  )
}

export default Dashboard