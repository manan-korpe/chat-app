import { useMutation } from "@tanstack/react-query";
import { useState, useContext } from "react";
import { updateProfile } from "../api/user.api.js";
import { UserContext } from "../contexts/Usercontext.jsx";

export default function Profile() {
  const { username, email, profileimg } = useContext(UserContext);

  const [data, setData] = useState({
    username: username,
    email: email,
  });

  const [fileData, setFileData] = useState(null);
  const [isUpdate, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      setLoading(false);
      setUpdate(false);
      console.log("done")
    },
    onError: (err) => {
      alert("err", err.message);
    },
  });

  function updateData(e) {
    setData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  }

  function formhandler(e) {
    e.preventDefault();
    setLoading(true);
    console.log("wokring");
    const instform = new FormData();

    instform.append("file", fileData);
    instform.append("username", data.username);
    instform.append("email", data.email);

    mutate(instform);
  }

  console.log(isLoading);
  return (
    <div className="col-md-9">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <form
          onSubmit={formhandler}
          className="bg-primary px-3 py-5 text-white rounded w-50 d-flex flex-column gap-3"
        >
          <h2 className="text-center">Profile</h2>
          <div className="d-flex flex-column align-items-center mb-1">
            <div style={{ width: "100px", height: "100px" }}>
              <img
                className="img-thumbnail w-100 h-100 object-fit-cover rounded-circle"
                src={profileimg}
              ></img>
            </div>
            <input
              className="form-control mt-3"
              type="file"
              name="file"
              onChange={(e) => setFileData(e.target.files[0])}
              disabled={!isLoading && !isUpdate}
            />
          </div>
          <div>
            <label className="form-label">User Name</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={data.username}
              onChange={updateData}
              disabled={!isLoading && !isUpdate}
            />
          </div>
          <div>
            <label className="form-label">email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={data.email}
              onChange={updateData}
              disabled={!isLoading && !isUpdate}
            />
          </div>
          <div className="text-center mt-4">
            {isUpdate ? (
              <button  className="btn btn-light text-primary"  >
                {isLoading ? <div className="spinner-border"></div> : "Submit"}
              </button>
            ) : (
              <div
                onClick={() => setUpdate(true)}
                className="btn btn-light text-primary"
              >
                Update
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
