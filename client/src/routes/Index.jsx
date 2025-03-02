import { BrowserRouter } from "react-router-dom";
import AppRoute from "./AppRoute.jsx";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Store from "../config/ReduxStore.js";

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}
