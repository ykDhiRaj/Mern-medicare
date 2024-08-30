import React, { useEffect, useState } from 'react'
import Hospitalcard from '../components/Hospitalcard';

function Hospitals() {
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
  return (
    <>
        <div className="flex flex-wrap gap-6 justify-start p-4">
            {hospitals && hospitals.map((hospital)=>(
                <Hospitalcard key={hospital._id} hospital={hospital}/>
            ))}
        </div>
    </>
  )
}

export default Hospitals