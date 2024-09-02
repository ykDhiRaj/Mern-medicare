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
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import HospitalRegister from "./pages/HospitalRegister";
import HospitalList from "./pages/HospitalList";
import { useAdminAuthContext } from "./hooks/useAdminAuthContext";


function App() {

  const {user} = useAuthContext()
  const {hospital} = useHospitalAuthContext()
  const {admin} = useAdminAuthContext()
 
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

      <Route path="/admin" element={<AdminLogin/>}/>

      <Route path="/dashboard" element={admin?<Dashboard/>:<Home/>}/>

      <Route path="/registerhospital" element={admin?<HospitalRegister/>:<Home/>}/>

      <Route path="/allhospitals" element={admin?<HospitalList/>:<Home/>}/>


     </Routes>
     <Toaster />
    </BrowserRouter>
    </>
  )
}

export default App
