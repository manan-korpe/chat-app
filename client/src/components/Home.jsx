import { BsChatSquareDotsFill } from "react-icons/bs";
import "../style/animation.css";

export default function Home(){
    return(
        <div className="col-7 bg-light col-md-9 d-flex align-items-center justify-content-center" style={{height:"100%"}}>
            <div className="text-primary text-end ">
            <BsChatSquareDotsFill className="bounce fs-1 mb-2"/>
            <h6 className="fs-1">ChatWithMe</h6>
            </div>
            
        </div>
    )
}