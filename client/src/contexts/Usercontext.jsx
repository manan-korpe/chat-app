import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticate } from "../api/user.api.js";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [contacts, setContacts] = useState([]);
  const [active, setActive] = useState([]);

  const { isLoading, data, isSuccess, isError } = useQuery({
    queryKey: ["authentication"],
    queryFn: isAuthenticate,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setUsername(data?.data?.data?.username);
      setEmail(data?.data?.data?.email);
      setId(data?.data?.data?._id);
      setContacts(data?.data?.data?.contects);
    }
  }, [data]);

  console.log(id);
  return (
    <UserContext.Provider
      value={{
        username,
        id,
        email,
        contacts,
        isLoading,
        isError,
        active,
        setContacts,
        setUsername,
        setId,
        setActive,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
