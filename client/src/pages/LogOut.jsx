import {useQuery} from "@tanstack/react-query";
import {logOut} from "../api/user.api.js";
import {Navigate} from "react-router-dom";

export default function LogOut(){
    console.log("wokring")
    const {isLoading,isSuccess,isError} = useQuery(({
        queryKey:["logout"],
        queryFn:logOut
    }))

    if(isLoading)
        return <>Loading...</>

    if(isSuccess)
        return <Navigate to="/login"></Navigate>

    if(isError)
        return <Navigate to="/chat"></Navigate>
}