import {SocketContext} from "../contexts/SocketContext.jsx";
import {Outlet} from "react-router-dom";
import { Suspense, lazy , useEffect, useContext} from "react";
//components
const Aside = lazy(() => import("../components/Aside.jsx"));
const Message = lazy(() => import("../components/Message.jsx"));

function Home() {
  const {SocketConnection} = useContext(SocketContext);
  
  useEffect(()=>{
    SocketConnection();

  },[])
  

  return (
    <>
      <main className="container-fluid vh-100">
        <section className="row g-2 h-100">
          <Aside />
          <Outlet/>
        </section>
      </main>
    </>
  );
}

export default Home;
