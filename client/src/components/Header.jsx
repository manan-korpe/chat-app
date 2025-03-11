import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { UserContext } from "../contexts/Usercontext.jsx";

export default function Header() {
  const { username, id } = useContext(UserContext);

  return (
    <header>
      {/* <div className="d-md-none position-relative " style={{zIndex:"10"}}>
        <div className="position-absolute p-2 px-3 d-flex gap-3 align-items-center bg-primary rounded-pill mt-3 start-50 translate-middle-x" >
          <Link className="text-white  fs-4 d-flex" >
            <FaHome />
          </Link>
          <Link className="text-white  fs-4 d-flex">
            <IoSettings />
          </Link>
          <Link className="text-white  fs-4 d-flex">
            <IoLogOut />
          </Link>
        </div>
      </div> */}
      <nav className="navbar position-relative ">
        <div className=" container-fluid  justify-content-start">
          <div className="navbar-header me-5">
            <div className="navbar-brand text-primary">ChatWithMe</div>
          </div>
          <ul className="nav ms-5">
            <li className="nav-item ">
              <Link className="nav-link fs-5 py-0" to="/chat">
                <FaHome />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5 py-0" to="profile">
                <IoSettings />
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3 ms-auto me-4 border border-primary ps-3 pe-1 py-1 rounded">
            <img
              alt="img"
              className="bg-info rounded-circle"
              style={{ height: "2rem", width: "2rem" }}
            ></img>
            <div className="fw-bolder bg-primary py-1 px-4 rounded text-white">
              {username}
            </div>
          </div>
          <Link
            className="bg-primary text-white px-2 py-1 rounded "
            to="/logout"
          >
            Logout <IoLogOut className="fs-5" />{" "}
          </Link>
        </div>
      </nav>
    </header>
  );
}
