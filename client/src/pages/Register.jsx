import {Link} from "react-router-dom"
import {useState} from "react";
import {register} from "../api/user.api.js";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
    const {mutate} = useMutation({
      mutationFn:register,
      onSuccess:(res)=>{
        navigate("/login");
      },
      onError:(err)=>{
        alert(err.data)
      }
    });
    
    const [data,setData] = useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    });
    function changeData(e){
        setData((pre)=>{
            return {...pre,[e.target.name]:e.target.value}
        });
    }

    function SubmitHandler(e){
      e.preventDefault();
      mutate(data)
    }
  return (
    <main className="vw-100 vh-100 d-flex align-items-center justify-content-center bg-primary">
      <form onSubmit={SubmitHandler} className="p-4 py-5 shadow rounded bg-light">
        <h4 className="mb-4 text-center text-primary">Register</h4>
        <div className="input-group mb-4">
          <label className="input-group-text bg-primary text-white">User Name</label>
          <input type="text" name="username" className="form-control" value={data.username} onChange={changeData}></input>
        </div>
        <div className="input-group mb-4">
          <label className="input-group-text bg-primary text-white">
            Email
          </label>
          <input type="text" name="email" className="form-control" value={data.email} onChange={changeData}></input>
        </div>
        <div className="input-group mb-4">
          <label className="input-group-text bg-primary text-white">
            password
          </label>
          <input type="password" name="password" className="form-control" value={data.password} onChange={changeData}></input>
        </div>
        <div className="input-group mb-4">
          <label className="input-group-text bg-primary text-white">
          confirm
          </label>
          <input type="password" name="confirmpassword" className="form-control" value={data.confirmpassword} onChange={changeData}></input>
        </div>
        <div className="text-center">
          <button className="btn btn-primary ">Register</button>
        </div>
        <p className="text-end">
            <Link to="/login" >Login</Link>
        </p>
      </form>
    </main>
  );
}
