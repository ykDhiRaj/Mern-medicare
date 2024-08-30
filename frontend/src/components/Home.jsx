import React from "react";
import { useNavigate } from "react-router-dom";
import { useHospitalAuthContext } from "../hooks/useHospitalAuthContext";


function Home() {

  const {hospital} = useHospitalAuthContext()

  const navigate = useNavigate();
  const handleClick = (e)=>{
    e.preventDefault();
    navigate("/hospitals")
  }
  return (
    <>
      <div className="flex flex-col" style={{ height: "calc(100vh - 60px)" }}>
        <div className="home flex-1 flex items-center justify-between">
          <div className="lefthome w-[50%] h-full p-[90px]">
            <h1 className="text-7xl font-semibold text-blue-700">Your Health is our Priority.</h1>
            <p className="mt-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus veritatis cum esse nostrum, voluptatibus, officia eius ad libero voluptatem quos quam quasi debitis? Culpa ex ratione deleniti voluptatum temporibus dicta quis laborum, unde, cupiditate iusto aliquam eligendi deserunt vero eveniet hic omnis impedit. Soluta!</p>
            {!hospital?<>
            <button onClick={handleClick} className="bg-blue-500 p-5 rounded-md mt-10 text-white hover:scale-105 duration-300 hover:bg-blue-600">Book your appointment</button>
            </>:<></>}
          </div>
          <div className="righthome  w-[50%] h-full flex items-center justify-center">
            <div className="imgdiv">
              <img
                className="h-[550px] w-[550px] object-cover rounded-md"
                src="https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
