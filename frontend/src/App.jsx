import { BrowserRouter,Routes, Route } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Hospitals from "./pages/Hospitals"
import LoginForm from "./pages/LoginForm"
import SignupForm from "./pages/SignupForm";
import HospitalLogin from "./pages/HospitalLogin";
import { useAuthContext } from "./hooks/useAuthContext";
import { useHospitalAuthContext } from "./hooks/useHospitalAuthContext";
import Appointments from "./pages/Appointments";
import HospitalAppointment from "./pages/HospitalAppointment";


function App() {

  const {user} = useAuthContext()
  const {hospital} = useHospitalAuthContext()
 
  return (
    <>
    <BrowserRouter>
     <Navbar/>
     <Routes>
      
      <Route path="/" element={<Home/>}/>

      <Route path="/hospitals" element={<Hospitals/>}/>

      <Route path="/login" element={user? <Home/>:<LoginForm/>}/>

      <Route path="/signup" element={user? <Home/>:<SignupForm/>}/>

      <Route path="/loginhospital" element={user? <Home/>:<HospitalLogin/>}/>

      <Route path="/appointments" element={user? <Appointments/>:<Home/>}/>

      <Route path="/hospitalappoinments" element={<HospitalAppointment/>}/>


     </Routes>
     <Toaster />
    </BrowserRouter>
    </>
  )
}

export default App
