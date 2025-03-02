import {BrowserRouter} from "react-router-dom";
import AppRoute from "./AppRoute.jsx";

export default function Index(){
    return(
        <>
            <BrowserRouter>
                <AppRoute/>
            </BrowserRouter>
        </>
    )
}