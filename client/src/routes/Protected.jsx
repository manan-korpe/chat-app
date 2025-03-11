import {useContext} from "react";
import {UserContext} from "../contexts/Usercontext.jsx";
import {Outlet, Navigate} from "react-router-dom";

export default function ProtectedRoute(){
    const {id,isError,isLoading} = useContext(UserContext);
    
    if(isLoading)
        return <>Loding...</>
    
    if(isError)
        return <Navigate to="/login"/>

    return <Outlet/> 

}   