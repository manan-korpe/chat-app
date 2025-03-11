import { BsChatSquareDotsFill } from "react-icons/bs";
import "../style/animation.css";

export default function Home(){
    return(
        <div className="d-none d-md-block col-md-9">
        <div className="bg-light  d-flex align-items-center justify-content-center" style={{height:"100%"}}>
            <div className="text-primary text-end ">
            <BsChatSquareDotsFill className="bounce fs-1 mb-2"/>
            <h6 className="fs-1">ChatWithMe</h6>
            </div>
            
        </div>
        </div>
    )
}