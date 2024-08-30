import { useContext } from "react";
import { HospitalAuthContext } from "../context/HospitalAuthContext";


export const useHospitalAuthContext = ()=>{
    const context = useContext(HospitalAuthContext);

    if(!context){
        throw Error("useAuthContext must be used inside the AuthContextProvider")
    }

    return context

}