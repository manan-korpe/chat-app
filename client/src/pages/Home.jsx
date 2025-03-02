import { io } from "socket.io-client";
import { useEffect, useState, useMemo } from "react";
import {Suspense,lazy} from "react";

//comonent 
const Message = lazy(()=>import("../components/Message.jsx"));

function Home() {
  return (
    <>
      <main className="container-fluid vh-100">
        <section className="row g-2 h-100">
          <div className="col-5 col-md-3 bg-secondary   py-2 h-100">
            <div className=" h-100 ">
              <form className="p-2 mb-3">
                <input type="search" className="form-control rounded-4"></input>
              </form>
              <div className="p-3  overflow-auto list-scroll" style={{height:"90%"}}>
                {[10,20,303,4,5,4,5,20,303,4,5,4,5].map((val,i)=>(
                  <Friends key={i}/>
                ))}
              </div>
            </div>
          </div>
          
            <Message name="manan" active="true"/>
        </section>
      </main>
    </>
  );
}

//list of contact in a side
function Friends({dp,name,message,pending=0}){
  return(
    <div className="bg-light row justify-content-center align-item-center  p-3 mb-2 shadow-sm rounded">
      <div className="col-3">
        <img className="bg-info rounded-circle my-auto" style={{height:"2rem",width:"2rem"}}></img>
      </div>
      <div className="col-7">
        <h6 className="text-capitalize m-0">mayank</h6>
        <div className="w-100 text-truncate pe-3 text-muted" style={{height:"20px"}}><small>Discover 3500+ Chat App designs on Dribbble. Your resource to discover and connect with designers worldwide.Discover 3500+ Chat App designs on Dribbble. Your resource to discover and connect with designers worldwide.</small></div>
      </div>
    <div className="col-2">
      <div className="d-flex flex-column h-100 align-items-center justify-content-center">
      <span className=" badge bg-success mb-1">46+</span>
      <small className="text-muted" style={{fontSize:".8rem"}}>yesterday</small>
      </div>
   
    </div>
    </div>
  )
}


export default Home;
