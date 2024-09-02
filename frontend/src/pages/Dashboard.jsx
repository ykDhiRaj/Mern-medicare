import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdminAuthContext } from '../hooks/useAdminAuthContext';


function Dashboard() {

  const {dispatch} = useAdminAuthContext()

  const navigate = useNavigate();

  const handleRegister = (e)=>{
    e.preventDefault()

    navigate('/registerhospital')
  }

  const handleHospitals = (e)=>{
    navigate("/allhospitals")
  }

  const handleLogout = (e)=>{
    e.preventDefault()
    localStorage.removeItem("admin",'')
    dispatch({type:'LOGOUT',payload:''})
    navigate('/')
  }

  return (
    <div className='p-5'>
    <div onClick={handleHospitals} className='cursor-pointer bg-blue-400 h-[90px] w-[500px] shadow-lg shadow-gray-500 rounded-md text-white hover:scale-105 duration-300 hover:bg-blue-500 '>
      <p className='pt-6 text-center text-4xl'>See all Hospitals</p>
    </div>
    <div onClick={handleRegister} className='mt-5 cursor-pointer bg-blue-400 h-[90px] w-[500px] shadow-lg shadow-gray-500  rounded-md text-white hover:scale-105 duration-300 hover:bg-blue-500'>
      <p className='pt-6 text-center text-4xl'>Register a hospital</p>
    </div>
    <button onClick={handleLogout} className='mt-9 text-3xl bg-red-500 text-white p-4 rounded-md font-semibold'>Logout</button>
  </div>
  
  )
}

export default Dashboard