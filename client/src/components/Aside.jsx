import { useContext } from "react";
import { lazy } from "react";
import { UserContext } from "../contexts/Usercontext.jsx";

//comonent
const ContactList = lazy(() => import("./ContactList.jsx"));
const AddContectForm = lazy(() => import("./AddContact.jsx"));

export default function Aside() {
  const { username, id, contacts } = useContext(UserContext);
  return (
    <div className=" position-relative col-5 col-md-3 bg-secondary   py-2 h-100">
      <div className=" h-100 ">
        <div className="card bg-dark text-white">
          <div className="card-body py-2">
            <h5>
              <span className="text-info">UserName:</span> {username}
            </h5>
          </div>
          <div className="card-footer">
            <span className="text-info">userId: </span>
            {id}
          </div>
        </div>
        <form className="p-2 my-3">
          <input type="search" className="form-control rounded-4"></input>
        </form>
        <div
          className="p-3  overflow-auto list-scroll"
          style={{ height: "75%" }}
        >
          {<ContactList contacts={contacts} />}
        </div>
        <AddContectForm />
      </div>
    </div>
  );
}
