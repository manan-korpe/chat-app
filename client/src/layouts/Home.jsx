import {SocketContext} from "../contexts/SocketContext.jsx";
import {Outlet} from "react-router-dom";
import { Suspense, lazy , useEffect, useContext} from "react";
//components
const Aside = lazy(() => import("../components/Aside.jsx"));
const Header = lazy(() => import("../components/Header.jsx"));

function Home() {
  const {SocketConnection} = useContext(SocketContext);
  
  useEffect(()=>{
    SocketConnection();
  },[])
  

  return (
    <>
      <main className="container-fluid vh-100 ">
        <Header/>
        <section className="row " style={{height:"91%"}}>
          <Aside />
          <Outlet/>
        </section>
      </main>
    </>
  );
}

export default Home;
