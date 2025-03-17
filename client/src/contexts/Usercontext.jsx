import { createContext, useState, useEffect,memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticate } from "../api/user.api.js";

export const UserContext = createContext();

 function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [profileimg, setProfileimg] = useState("");
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
      setProfileimg(data?.data?.data?.profile || "#");
      setEmail(data?.data?.data?.email);
      setId(data?.data?.data?._id);
      setContacts(data?.data?.data?.contects);
    }
  }, [data]);
  return (
    <UserContext.Provider
      value={{
        username,
        id,
        email,
        profileimg,
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

export default memo(UserContextProvider)
