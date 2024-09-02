import React, { useState } from 'react'
import toast from 'react-hot-toast';

function HospitalCardForAdmin({hospital, onDelete}) {


    const handleClick = async (e) => {
        e.preventDefault();
    
        const admin = JSON.parse(localStorage.getItem('admin'));
        const token = admin?.token;
    
        try {
            const response = await fetch(`http://localhost:3000/api/admin/deletehospital/${hospital._id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
          
    
          const json = await response.json();
    
          if (response.ok) {
            toast.success("Hospital deleted successfully");
            onDelete(hospital._id);
            
            
          } else {
            if (admin) {
              toast.error(json.message);
            } else {
              toast.error("You need to login first");
            }
          }
        } catch (error) {
          console.error("Error removing hospital:", error);
          alert("An error occurred while removing the hospital.");
        }
      };

  return (
    <div className='hospitalcard max-w-sm w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 ml-5 mt-4 flex flex-col justify-between'>
    <h1 className='text-3xl font-bold text-gray-800'>{hospital.name}</h1>
    <div className='mt-4'>
      <p className='text-gray-600'>City: <span className='font-medium'>{hospital.city}</span></p>
      <p className='text-gray-600'>Email: <span className='font-medium'>{hospital.email}</span></p>
    </div>
    <button
      onClick={handleClick}
      className='mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105'
    >
      Remove Hospital
    </button>
  </div>
  )
}

export default HospitalCardForAdmin