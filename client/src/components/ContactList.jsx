import {Link} from "react-router-dom";
import {useContext } from "react";
import { UserContext } from "../contexts/Usercontext.jsx";

export default function contactList() {
  const {contacts } = useContext(UserContext);

  if (contacts.length <= 0) 
    return <h4 className="text-center">No Contect </h4>;

  return (
    <>
    {contacts.map((data,i)=>(
    <Link to={data._id} key={i}>
        <div  className="bg-primary row justify-content-center align-item-center  p-3 mb-2 shadow-sm rounded">
        <div className="col-3">
            <img
            src={data.profile || "#"}
            className="bg-info rounded-circle my-auto"
            style={{ height: "2rem", width: "2rem" }}
            ></img>
        </div>
        <div className="col-7">
            <h6 className="text-capitalize m-0 text-light">{data.username}</h6>
            <div
            className="w-100 text-truncate pe-3 text-light"
            style={{ height: "20px" }}
            >
            <small>
                Discover 3500+ Chat App designs on Dribbble. Your resource to
                discover and connect with designers worldwide.Discover 3500+ Chat
                App designs on Dribbble. Your resource to discover and connect with
                designers worldwide.
            </small>
            </div>
        </div>
        <div className="col-2">
            <div className="d-flex flex-column h-100 align-items-center justify-content-center">
            {/* <span className=" badge bg-success mb-1">46+</span> */}
            <small className="text-muted" style={{ fontSize: ".8rem" }}>
                yesterday
            </small>
            </div>
        </div>
        </div>
    </Link>
    ))}
    </>
  );
}
