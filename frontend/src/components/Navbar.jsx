import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext';
import { useHospitalAuthContext } from '../hooks/useHospitalAuthContext';


function Navbar() {
    const navigate = useNavigate();
    const {user,dispatch} = useAuthContext()
    const {hospital,dispatch:hospitaldispatch} = useHospitalAuthContext()

    const handleClick = (e)=>{
        e.preventDefault()
        navigate('/')
    }

    const handleLogout = (e)=>{
        e.preventDefault()
        if(localStorage.getItem('user')){
            localStorage.removeItem('user');
            dispatch({type:'LOGOUT',payload:''});
            navigate('/')

        }else{
            localStorage.removeItem('hospital')
            hospitaldispatch({type:'LOGOUT',payload:''})
            navigate('/')
        }
    }

  return (
   <>
    <nav>
        <div className='flex text-white font-semibold text-xl bg-blue-300 p-4 justify-between'>
            <div className="leftnav ">
                <h1 onClick={handleClick} className='text-blue-700 cursor-pointer'>MediCare</h1>
            </div>
            <div className="rightnav mr-10 flex gap-11 ">
                {!hospital?<>
               <Link className='font-thin hover:underline' to={'/hospitals'}>Hospitals</Link>
                </>
                :
                <>
                
                </>}
                {/* {hospital?<Link to={'/hospitalappoinments'}>Appointments</Link>:<></>} */}
               {user || hospital?<>
               <Link className='font-thin hover:underline' to={user?"/appointments":'/hospitalappoinments'}>Appointments</Link>
                <button onClick={handleLogout} className='bg-red-500 font-thin px-1 h-8 rounded-md text-lg hover:bg-red-600'>Logout</button>
               </>:
               <>
               <Link className='font-thin hover:underline' to={'/login'}>Login</Link>
               <Link className='font-thin hover:underline' to={'/signup'}>Signup</Link>
               <Link className='font-thin hover:underline' to={'/loginhospital'}>For Hospital</Link>
               
               </>
               
               }
            </div>
        </div>
    </nav>
   </>
  )
}

export default Navbar