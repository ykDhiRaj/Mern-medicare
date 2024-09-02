import React, { useEffect, useState } from 'react'
import Hospitalcard from '../components/Hospitalcard';
import HospitalCardForAdmin from '../components/HospitalCardForAdmin';

function HospitalList() {

    const [hospitals, setHospitals] = useState([]);

    useEffect(()=>{
        const fetchHospitals = async ()=>{
             const response = await fetch("http://localhost:3000/api/hospital",{
                 headers:{
                     "Content-Type":"application/json"
                 }
             })
             const json = await response.json();
             if(response.ok){
                 setHospitals(json)
             }
 
        }
        fetchHospitals()
     },[])

     const handleDeleteHospital = (hospitalId) => {
        setHospitals(hospitals.filter(hospital => hospital._id !== hospitalId));
      };

  return (
     <>
        <div className="flex flex-wrap gap-6 justify-start p-4">
            {hospitals.length > 0?<>
            {hospitals && hospitals.map((hospital)=>(
                <HospitalCardForAdmin key={hospital._id} hospital={hospital} onDelete={handleDeleteHospital}/>
            ))}
            
            </>:<>
            <p className='text-4xl text-gray-500'>Please create some hospitals..</p>
            </>}
        </div>
    </>
  )
}

export default HospitalList