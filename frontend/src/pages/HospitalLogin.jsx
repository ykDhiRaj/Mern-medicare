import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useHospitalAuthContext } from '../hooks/useHospitalAuthContext';

function HospitalLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const {dispatch} = useHospitalAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle login logic here (e.g., API call)
    // console.log('Email:', email);
    // console.log('Password:', password);

    const response = await fetch('http://localhost:3000/api/hospital/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization':`Bearer ${user.token}`
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (response.ok) {
      // Handle successful login
    //   console.log('Login successful:', json);
      toast.success('Successfully loggedin!');
      localStorage.setItem("hospital",JSON.stringify(json));
      dispatch({type:'LOGIN', payload:json})
      setEmail('')
      setPassword('')
      navigate('/')
    } else {
      // Handle login error
    //   console.error('Login error:', json.msg);
      toast.error(json.msg);
    }
  };


  return (
    <div className="flex justify-center items-center " style={{ height: "calc(100vh - 60px)" }}>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Hospital Login</h2>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
        <p className='text-sm mt-4'>This page is for hospital usage only</p>
      </form>
    </div>
  )
}

export default HospitalLogin