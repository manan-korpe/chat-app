import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Message = lazy(() => import("../components/Message.jsx"))
const HomeLayout = lazy(() => import("../layouts/Home.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Home = lazy(() => import("../components/Home.jsx"))

export default function AppRoute() {
  return (
    <Suspense fallback="loading....">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="chat" element={<HomeLayout />}>
          <Route index element={<Home/>}></Route>
          <Route path=":id" element={<Message />} />
        </Route>

      </Routes>
    </Suspense>
  );
}
