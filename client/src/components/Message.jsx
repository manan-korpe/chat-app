export default function Message({ image, name="" ,active=false}) {
  return (
    <div className="col-7 col-md-9 text-white ">
      <nav className="d-flex gap-4 align-items-center p-2 bg-secondary rounded-bottom-4">
        <div
          className="flex-shink-0 bg-info rounded-circle border border-2 border-success"
          style={{ width: "50px", height: "50px" }}
        >
          <img src={image} alt="dp"></img>
        </div>
        <div className="w-75">
          <h5 className="fs-5 m-0">{name} </h5>
          <small className={active ? "text-dark": "text-danger"} style={{ letterSpacing: ".8px" }}>
            online
          </small>
        </div>
        <div className="badge bg-success ">100+</div>
      </nav>
      <div className=" rounded-3 p-2 my-2 overflow-auto message" style={{height:"80vh"}}>
        <ul
          className="p-0"
          style={{ listStyleType: "none" }}
        >
            {[1,2,3,4,2,,2,2,2,25].map((val,i)=>(
                <>
                <Chat
            message={new Date().toISOString().split("T")[0]}
            who="date"
          />
          <Chat
            message="On this page, we will share a curated collection of chat UI designed by some best talents from the world to inspire you and spark new ideas for your design 
            On this page, we will share a curated collection of chat UI designed by some best talents from the world to inspire you and spark new ideas for your design 
            On this page, we will share a curated collection of chat UI designed by some best talents from the world to inspire you and spark new ideas for your design 
           "
            who="me"
            time={`${new Date().getHours()}:${new Date().getSeconds()}`}
          />
          <Chat
            message="hii"
            who="you"
            time={`${new Date().getHours()}:${new Date().getSeconds()}`}
          />
          </>
            ))}
            
        </ul>
      </div>
      <form className="p-2 ">
        <div className="input-group">
        <input type="text" className="form-control"></input>
        <button className="btn input-gorup-text btn-success">Send</button>
        </div>
            
      </form>
    </div>
  );
}

function Chat({ who, message, time }) {
  return (
    <li className={`d-flex ${who === "me" ? "justify-content-end" : who==="you" ? "justify-content-start" : "justify-content-center mb-3"} px-2`}>
      <div className={`alert ${who==="me" ? "alert-info" : who==="you" ? "alert-danger" : "alert-warning rounded-5"} p-1 px-3 rounded-3`} style={{maxWidth:"45%"}}>
          <div>{message} {time && <small className="ms-2 " style={{fontSize:".6rem"}}>{time}</small>}</div>
      </div>
    </li>
  );
}
