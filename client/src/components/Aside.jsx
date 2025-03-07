import { useContext } from "react";
import { lazy } from "react";
import { UserContext } from "../contexts/Usercontext.jsx";

//comonent
const ContactList = lazy(() => import("./ContactList.jsx"));
const AddContectForm = lazy(() => import("./AddContact.jsx"));

export default function Aside() {
  const { username, id, contacts } = useContext(UserContext);
  return (
    <div className="position-relative col-5 col-md-3 bg-light">
      <div >
        <form className="p-2 my-2">
          <input type="search" className="form-control rounded-4"></input>
        </form>
        <div
          className="px-3 overflow-auto list-scroll"
          style={{ height: "75%" }}
        >
          {<ContactList contacts={contacts} />}
        </div>
        <AddContectForm />
      </div>
    </div>
  );
}
