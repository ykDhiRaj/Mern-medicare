import { createContext, useEffect, useReducer } from "react";

export const AdminAuthContext = createContext()

export const adminAuthReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return{
                admin:action.payload
            }
        case 'LOGOUT':
            return{
                admin:null
            }
        default:
            return state
    }
}

export const AdminAuthContextProvider = ({children})=>{

    const [state,dispatch] = useReducer(adminAuthReducer,{
        admin:null
    })

    useEffect(()=>{
        const admin = JSON.parse(localStorage.getItem('admin')) 
        if(admin){
            dispatch({type:'LOGIN', payload:admin})
        }
    },[])

    console.log('AdminAuthContext state:', state);

    return(

    <AdminAuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AdminAuthContext.Provider>

    )
}