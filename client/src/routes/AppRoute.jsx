import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Message = lazy(() => import("../components/Message.jsx"))
const HomeLayout = lazy(() => import("../layouts/Home.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Home = lazy(() => import("../components/Home.jsx"));
const Profile = lazy(() => import("../components/Profile.jsx"));
import ProtectedRoute from "./Protected.jsx";
import LogOut from "../pages/LogOut.jsx";

export default function AppRoute() {
  return (
    <Suspense fallback="loading....">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="chat" element={<HomeLayout />}>
          <Route index element={<Home/>}></Route>
          <Route path="profile" element={<Profile/>}></Route>
          <Route path=":id" element={<Message />} />
        </Route>
        </Route>
        <Route path="logout" element={<LogOut/>}/>
      </Routes>
    </Suspense>
  );
}
