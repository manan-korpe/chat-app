import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

export default function Header() {
  return (
    <header className="navbar">
      <div className="container-fluid  justify-content-start">
        <div className="navbar-header me-5">
          <div className="navbar-brand text-primary">ChatWithMe</div>
        </div>
        <ul className="nav ms-5">
          <li className="nav-item ">
            <Link className="nav-link fs-5 py-0" to="/chat"><FaHome/></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fs-5 py-0" to="/setting"><IoSettings/></Link>
          </li>
        </ul>
        <div className="d-flex align-items-center gap-5 ms-auto me-4 border border-primary px-3 py-1 rounded text-primary">
            <img alt="img" className="bg-info rounded-circle" style={{height:"2rem",width:"2rem"}}></img>
            <div  >Manan korpe</div>
        </div>
        <Link className="bg-primary text-white px-2 py-1 rounded ">Logout <IoLogOut className="fs-5"/> </Link>
      </div>
    </header>
  );
}
