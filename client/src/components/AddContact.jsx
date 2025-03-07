import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../contexts/Usercontext.jsx";
import { BiSolidMessageSquareAdd } from "react-icons/bi"; //icon
import { addContact, getUser } from "../api/user.api.js"; //apis

export default function AddContactForm() {
  const { setContacts } = useContext(UserContext);
  const [friendEmail, setFriendEmail] = useState("");
  const [firendName, setFriendName] = useState("");

  const getFreiendMutation = useMutation({
    mutationFn: getUser,
    onSuccess: (res) => {
      setFriendName(res.data.user.username);
    },
    onError: (err) => {
      setFriendName("Not Found");
    },
  });

  const addFreiendMutation = useMutation({
    mutationFn: addContact,
    onSuccess: (res) => {
      setContacts((pre) => {
        return [...pre, res.data.data];
      });
    },
    onError: (err) => {
      console.log("something going wrong");
    },
  });

  function searchFriend() {
    getFreiendMutation.mutate(friendEmail);
  }

  function addFriend() {
    addFreiendMutation.mutate(friendEmail);
  }

  function clearform() {
    setFriendName("");
    setFriendEmail("");
  }
  return (
    <>
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
                  <input
                    type="text"
                    className="form-control"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                  ></input>
                  <button
                    type="button"
                    className="input-group-text bg-info"
                    onClick={searchFriend}
                  >
                    Search
                  </button>
                </div>
                <div className="container">
                  <span
                    className={`badge friend-name ${
                      String(firendName).toLowerCase() == "not found"
                        ? "bg-danger"
                        : "bg-info"
                    }`}
                  >
                    {firendName && firendName}
                  </span>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className={
                  firendName == "Not Found"
                    ? "btn btn-success disabled"
                    : "btn btn-success "
                }
                onClick={firendName && addFriend}
                data-bs-dismiss="modal"
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
    </>
  );
}
