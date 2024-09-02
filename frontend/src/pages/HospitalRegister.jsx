import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function HospitalRegister() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const admin = JSON.parse(localStorage.getItem('admin'));
//   const hospitalEmail = hospital?.email;
  const token = admin?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle login logic here (e.g., API call)
    // console.log('Fullname', fullname)
    // console.log('Email:', email);
    // console.log('Password:', password);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedCity = city.trim();

    // Validate input to ensure no empty strings after trimming
    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedCity) {
      toast.error('Please fill in all fields without leading or trailing spaces.');
      return;
    }

    const response = await fetch('http://localhost:3000/api/admin/signuphospital', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({ name, email, password, city }),
    });

    const json = await response.json();
    if (response.ok) {
      // Handle successful login
    //   console.log('Login successful:', json);
      toast.success('Successfully created new Hospital!');
      setEmail('')
      setPassword('')
      setName('')
      setCity('')
      navigate('/dashboard')
    } else {
      // Handle login error
    //   console.error('Login error:', json.msg);
      toast.error(json.msg);
    }
  };


  return (
    <div className="flex justify-center items-center " style={{ height: "calc(100vh - 60px)" }}>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 className="text-2xl font-semibold mb-4 text-center">Signup Hospital</h2>
      <div className="mb-4">
        <label htmlFor="fullname" className="block text-gray-700 mb-2">
          Name:
        </label>
        <input
          type="text"
          id="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 mb-2">
          City:
        </label>
        <input
          type="text"
          id="citytext"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Signup Hospital
      </button>
    </form>
  </div>
  )
}

export default HospitalRegister