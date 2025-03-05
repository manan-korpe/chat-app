import { BrowserRouter } from "react-router-dom";
import AppRoute from "./AppRoute.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
    </QueryClientProvider>
  );
}
