import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";

export const useAdminAuthContext = ()=>{
    const context = useContext(AdminAuthContext);

    if(!context){
        throw Error("useAdminAuthContext must be used inside the AdminAuthContextProvider")
    }

    return context

}