import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticate } from "../api/user.api.js";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [contacts, setContacts] = useState([]);
  const [active,setActive] = useState([]);

  const { data, isSuccess, isError, errr } = useQuery({
    queryKey: ["authentication"],
    queryFn: isAuthenticate,
  });

  useEffect(() => {
    if (isSuccess) {
      setUsername(data?.data?.data?.username);
      setId(data?.data?.data?._id);
      setContacts(data?.data?.data?.contects);
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{ username, id, contacts, active, setContacts, setUsername, setId, setActive}}
    >
      {children}
    </UserContext.Provider>
  );
}
