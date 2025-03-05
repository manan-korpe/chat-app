import { useEffect, useState, useMemo } from "react";
import { Suspense, lazy } from "react";

//icon
import { BiSolidMessageSquareAdd } from "react-icons/bi";

//comonent
const Message = lazy(() => import("../components/Message.jsx"));

function Home() {
  
  const [friendEmail,setFriendEmail] = useState("");
  const [firendName,setFriendName] = useState("");
  const [contects,setContects] = useState([])

  function searchFriend(){
    
  }
  function clearform(){
    setFriendName("");
    setFriendEmail("");
  }

  function addFriend(){
  
  }

  return (
    <>
      <main className="container-fluid vh-100">
        <section className="row g-2 h-100">
          <div className=" position-relative col-5 col-md-3 bg-secondary   py-2 h-100">
            <div className=" h-100 ">
              <form className="p-2 mb-3">
                <input type="search" className="form-control rounded-4"></input>
              </form>
              <div
                className="p-3  overflow-auto list-scroll"
                style={{ height: "90%" }}
              >
                {contects.length<=0 ? <h4 className="text-center">No Contect </h4> : contects.map(
                  (val, i) => (
                    <Friends key={i} name={val?.username} />
                  )
                )}
              </div>

              <div
                className="position-absolute"
                style={{ bottom: "15px", right: "20px" }}
              >
                <button
                  className="btn btn-lg btn-success text-white shadow"
                  data-bs-toggle="modal"
                  data-bs-target="#addFried"
                >
                  <BiSolidMessageSquareAdd className="fs-3" />
                </button>
              </div>

              <div
                className="modal  fade"
                id="addFried"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="addFriedform"
                aria-hidden="true"
              >
                <div className="modal-dialog mt-5 " role="document">
                  <div className="modal-content bg-dark">
                    <div className="modal-header d-flex justify-content-between">
                      <h5 className="modal-title" id="addFriedform">
                        Add Friend
                      </h5>
                      <button
                        type="button"
                        className="close btn btn-danger float-end"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={clearform}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body py-5">
                      <form>
                        <label className="form-label ">Friend's Email</label>
                        <div className="input-group mb-3">
                          <input type="text" className="form-control" value={friendEmail} onChange={e=>setFriendEmail(e.target.value)}></input>
                          <button
                            type="button"
                            className="input-group-text bg-info"
                            onClick={searchFriend}
                          >
                            Search
                          </button>
                        </div>
                        <div className="container">
                          <span className="badge bg-info friend-name">{firendName && firendName}</span>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className={firendName == "Not Found" ? "btn btn-success disabled" : "btn btn-success "}
                        onClick={firendName && addFriend}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={clearform}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Message name="manan" active="true" />
        </section>
      </main>
    </>
  );
}

//list of contact in a side
function Friends({ dp, name, message, pending = 0 }) {
  return (
    <div className="bg-light row justify-content-center align-item-center  p-3 mb-2 shadow-sm rounded">
      <div className="col-3">
        <img
          className="bg-info rounded-circle my-auto"
          style={{ height: "2rem", width: "2rem" }}
        ></img>
      </div>
      <div className="col-7">
        <h6 className="text-capitalize m-0 text-dark">{name}</h6>
        <div
          className="w-100 text-truncate pe-3 text-muted"
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
          <span className=" badge bg-success mb-1">46+</span>
          <small className="text-muted" style={{ fontSize: ".8rem" }}>
            yesterday
          </small>
        </div>
      </div>
    </div>
  );
}

export default Home;
