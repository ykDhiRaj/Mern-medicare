import { createContext, useEffect, useReducer } from "react";


export const HospitalAuthContext = createContext()

export const hospitalAuthReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return{
                hospital:action.payload
            }
        case 'LOGOUT':
            return{
                hospital:null
            }
        default:
            return state
    }
}

export const HospitalAuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(hospitalAuthReducer,{
        hospital:null
    })

    useEffect(()=>{
        const hospital =JSON.parse( localStorage.getItem("hospital"))
        if(hospital){
            dispatch({type:'LOGIN', payload:hospital})
        }
    },[])

    console.log('HospitalAuthContext state:', state);

    return(
        <HospitalAuthContext.Provider value={{...state,dispatch}}>
            {children}
        </HospitalAuthContext.Provider>
    )
}