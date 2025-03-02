import {Link} from "react-router-dom"
import {useState} from "react";

export default function Login() {
  const [data,setData] = useState({
          email:"",
          password:"",
      });
      function changeData(e){
          setData((pre)=>{
              return {...pre,[e.target.name]:e.target.value}
          });
      }

  return (
    <main className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <form className="p-4 py-5 shadow rounded bg-secondary">
        <h4 className="mb-4 text-center text-dark">Login</h4>
        <div className="input-group mb-4">
          <label className="input-group-text bg-dark text-white">Email</label>
          <input type="text" name="email" className="form-control"  value={data.username} onChange={changeData}></input>
        </div>
        <div className="input-group mb-4">
          <label className="input-group-text bg-dark text-white">
            password
          </label>
          <input type="password" name="password" className="form-control" value={data.password} onChange={changeData}></input>
        </div>
        <div className="text-center">
          <button className="btn btn-dark ">LogIn</button>
        </div>
        <p className="text-end">
            <Link to="/register " className="text-dark">Register</Link>
        </p>
      </form>
    </main>
  );
}
