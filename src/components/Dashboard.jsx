import React, { useEffect, useState,useContext } from 'react'
import DataTable from './DataTable'
const Dashboard = () => {
  return (
    <div className='flex border-2 rounded-lg mt-11 '>
    <DataTable />
    </div>
  )
}

export default Dashboard