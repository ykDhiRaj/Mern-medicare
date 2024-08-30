import React from 'react';
import toast from 'react-hot-toast';

function Hospitalcard({ hospital }) {

  const handleClick = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    try {
        const response = await fetch(`http://localhost:3000/api/appointment/${hospital._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      

      const json = await response.json();

      if (response.ok) {
        toast.success("Appointment requested successfully");
      } else {
        if (user) {
          toast.error(json.message);
        } else {
          toast.error("You need to login first");
        }
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking the appointment.");
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
    Book Appointment
  </button>
</div>
  );
}

export default Hospitalcard;
