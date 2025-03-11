import { FaPen } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/Usercontext.jsx";
import { updateProfile } from "../api/user.api.js";
import { useMutation } from "@tanstack/react-query";

export default function Profile() {
  const { username, email } = useContext(UserContext);
  const [isDisabled, setIsdisabled] = useState(true);
  const [data, setData] = useState({
    file: null,
    username: username,
    email: email,
  });

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      alert("profile updated success fully");
    },
    onError: (err) => {
      alert("something gone wrong try again");
    },
  });

  function formHandler(e) {
    setData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  }

  function reSetForm() {
    setData({
      username: username,
      email: email,
    });
    setIsdisabled(!isDisabled);
  }

  function updateProfile(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("file", data.file);
    form.append("username", data.username);
    mutate(form);
  }
  return (
    <div className="col-md-9 ">
      <div className="h-100 bg-light d-flex align-items-start justify-content-center rounded-top">
        <form
          onSubmit={updateProfile}
          className="p-3 mt-5 w-50 rounded bg-primary text-white"
        >
          <h2 className="text-center p-3">Profile</h2>
          <div className="d-flex flex-column gap-2 align-items-center mb-4">
            <div style={{ width: "100px", height: "100px" }}>
              <img className="img-thumbnail w-100 h-100 rounded-circle bg-light"></img>
            </div>
            {!isDisabled && (
              <input
                type="file"
                name="file"
                value={data.file}
                onChange={formHandler}
              />
            )}
          </div>
          <div className="mb-4">
            <label className="form-label">User Name</label>
            <input
              className="form-control"
              name="username"
              type="text"
              onChange={formHandler}
              value={data.username}
              disabled={isDisabled}
            ></input>
          </div>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              type="text"
              onChange={formHandler}
              value={data.email}
              disabled={isDisabled}
            ></input>
          </div>
          <div className="d-block text-center">
            {isDisabled ? (
              <button type="button" onClick={()=>setIsdisabled(!isDisabled)} className="btn btn-light text-primary">
                <FaPen></FaPen>
              </button>
            ) : (
              <>
                <button type="submit" className="btn btn-light text-primary">
                  Submit
                </button>
                <button
                  onClick={reSetForm}
                  type="button"
                  className="btn btn-light ms-2 text-primary"
                >
                  <MdCancel />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
