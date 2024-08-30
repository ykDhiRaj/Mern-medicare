import React, { useEffect, useState } from 'react';
import {format} from 'timeago.js'
import {toast} from "react-hot-toast"

function HospitalAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const hospital = JSON.parse(localStorage.getItem('hospital'));
  const hospitalEmail = hospital?.email;
  const token = hospital?.token;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/appointment/${hospitalEmail}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.ok){
          const data = await response.json();
          setAppointments(data);
        }

        if(!response.ok){

        }

      } catch (error) {
        setError(error.message);
      }
    };

    if (hospitalEmail) {
        fetchAppointments();
    }
  }, [hospitalEmail, token]);

  const handleReject = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/appointment/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if(response.ok){
        toast.success('Successfully removed')
      }

      if (!response.ok) {
        throw new Error('Failed to reject appointment');
      }

      // Update the state to remove the rejected appointment
      setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
    } catch (error) {
      setError(error.message);
    }
  }

  const handleAccept = async (appointmentId)=>{
    try {
      const response = await fetch(`http://localhost:3000/api/appointment/${appointmentId}/status?status=accepted`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })

      if(response.ok){
        toast.success("Status updated")
        
        setAppointments(appointments.map(appointment =>
          appointment._id === appointmentId
            ? { ...appointment, status: 'accepted' }
            : appointment
        ));
      }

      if (!response.ok) {
        throw new Error('Failed to accept appointment');
      }

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="p-5">
    {error && <p className="text-red-500">{error}</p>}
    {appointments.length > 0 ? (
      <div className="flex flex-wrap">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="hospitalcard w-[350px] bg-white shadow-lg rounded-lg h-auto text-gray-800 m-4 p-6 transition-transform transform hover:scale-105 duration-300">
            <h1 className="text-xl font-semibold text-blue-800">User: {appointment.user.fullname}</h1>
            <p className="mt-2 text-gray-600">Status: <span className={`font-medium ${appointment.status === 'accepted' ? 'text-green-500' : 'text-yellow-500'}`}>{appointment.status}</span></p>
            <p className="mt-2 text-gray-600">Requested: <span className="text-gray-500">{format(appointment.createdAt)}</span></p>
            <div className="mt-6 flex justify-between">
              <button onClick={() => handleReject(appointment._id)} className="bg-red-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors">Reject</button>
              <button onClick={() => handleAccept(appointment._id)} className="bg-green-700 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-800 transition-colors">Accept</button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-3xl font-bold text-gray-600 text-center mt-4">No appointment requests yet...</p>
    )}
  </div>
  );
}

export default HospitalAppointment;
