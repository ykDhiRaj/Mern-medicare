import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/appointment', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }

                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchAppointments();
    }, [token]);

    return (
        <div className="flex flex-wrap gap-4 justify-start p-4">
            {appointments.length > 0 ? (
                appointments.map(appointment => (
                    <div key={appointment._id} className='hospitalcard w-[300px] bg-white shadow-md rounded-md text-blue-800 p-4'>
                        <h1 className='text-xl font-semibold'>{appointment.hospital.name}</h1>
                        <h1 className='mt-2 text-sm text-gray-600'>City: {appointment.hospital.city}</h1>
                        <p className='mt-2 text-sm text-gray-600'>Email: {appointment.hospital.email}</p>
                        <p className="text-gray-600 mt-1">Status: <span className={`font-medium ${appointment.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>{appointment.status}</span></p>
                        <p className='mt-2 text-sm text-gray-500'>Requested: {format(appointment.createdAt)}</p>
                    </div>
                ))
            ) : (
                <p className='text-4xl font-bold text-gray-600 text-center mt-4'>No appointments found</p>
            )}
        </div>
    );
}

export default Appointments;
