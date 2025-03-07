import { BrowserRouter } from "react-router-dom";
import AppRoute from "./AppRoute.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//contexts
import UserContextProvider from "../contexts/Usercontext.jsx";
import SocketContextProvider from "../contexts/SocketContext.jsx";

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SocketContextProvider>
          <BrowserRouter>
            <AppRoute />
          </BrowserRouter>
        </SocketContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
