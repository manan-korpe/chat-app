import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));

export default function AppRoute() {
  return (
    <Suspense fallback="loading....">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
          <Route index element={<Home />} />
      </Routes>
    </Suspense>
  );
}
