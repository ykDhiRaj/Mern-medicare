import React, { useEffect, useState } from 'react';
import InsuranceCard from '../components/InsuranceCard';
import { HeartPulse, Phone, Mail, Search } from 'lucide-react';
import axios from 'axios';

const Insurance = () => {

  const [insurances, setInsurances] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(()=>{
    const fetchInsurances = async() =>{
      try {
        const insurance = await axios.get('http://localhost:3000/api/insurance/get-insurances',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });

        console.log(insurance.data);

        if(insurance.data && Array.isArray(insurance.data)){
           setInsurances(insurance.data);
        }

      } catch (error) {
        return error;
      }
    }
    fetchInsurances();
  },[]);

  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-white">
        {/* Search Bar */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for insurance plans..."
              className="w-full py-3 pl-12 pr-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Insurance Plans Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Our Healthcare Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insurances.map(()=>(
              <InsuranceCard/>
            ))}
          </div>
        </div>

        {/* Contact Section  */}
         <div className="bg-blue-600 text-white py-12">
           <div className="max-w-6xl mx-auto px-4 text-center">
             <h2 className="text-2xl font-bold mb-4">Need Help Choosing the Right Plan?</h2>
             <p className="mb-6 max-w-2xl mx-auto">Our healthcare specialists are ready to help you find the perfect coverage for your needs and budget.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button className="bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition duration-300">
                 Schedule a Consultation
               </button>
               <button className="bg-transparent border border-white text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                 View All Plans
               </button>
             </div>
          </div>
          </div> 
      </div>
    </>
  );
};

export default Insurance;