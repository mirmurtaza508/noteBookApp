import React,{useState} from "react";
import {Link, useNavigate } from "react-router-dom";



const Login = (props) => {
  const [credentials, setCreadentials] = useState({email:"",password:""});
  let navigate = useNavigate();
  const handleSumbit = async (evt) =>{
    evt.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/Login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email,password: credentials.password}),
  });
  const json = await response.json();
  console.log(json)
  if(json.success){
    //Save the Auth token and redirect
    localStorage.setItem('token',json.authToken);
    navigate("/");
    props.showAlert("Logged in Successfully","success")
    console.log(json.authToken)
  }else{
    // alert("Invalid creadentails")
    props.showAlert("Invalid Creadentails","danger")
  }
}
const onchange = (evt) => {
  setCreadentials({ ...credentials, [evt.target.name]: evt.target.value });
  if(evt.target.id === "password" && evt.target.value !==''){
    document.querySelector("#btn-pass").style.visibility = "visible";
  }
};
    let password = document.querySelector("#password");
    let btn = document.querySelector("#btn-pass")
    const handleShow = () =>{
      if(password.type === "password"){
        password.type = "text";
        btn.style.background = "url(https://static.thenounproject.com/png/777497-200.png)";
        btn.style.backgroundSize = "contain";
        btn.style.backgroundPosition = "center";
      }else{
        password.type = "password"
        btn.style.background = "url(https://icon-library.com/images/show-password-icon/show-password-icon-18.jpg )";
        btn.style.backgroundSize = "contain";
        btn.style.backgroundPosition = "center";
      }
    }

  return (
    <div className="d-flex justify-content-center" style={{color:"white",height:"84vh"}}>
    <div className="mt-2" style={{width:"20rem", height:"22.5rem",background:"rgba(0,0,0,0.4)",padding:"2rem",borderRadius:"1rem",zIndex:"1"}}>
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSumbit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{cursor:"pointer"}}>
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onchange}
            style={{background:"lightgrey",color:"black"}}
            placeholder="Email"
            
            
          />
          <div id="emailHelp" className="form-text" style={{cursor:"pointer",color:"white"}}>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="form-control" style={{display:"flex",background:"lightgrey"}}>
          <input
            type="password"
            value={credentials.password}
            name="password"
            id="password"
            onChange={onchange}
            placeholder="Password"
            style={{background:"transparent",outline:"none",color:"black",border:"none",width:"100%"}}
          />
          <span id="btn-pass" onClick={handleShow} style={{width:"2rem",visibility:"hidden",cursor:"pointer",background:"url(https://icon-library.com/images/show-password-icon/show-password-icon-18.jpg )",backgroundPosition:"center",backgroundSize:"contain"}}/>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:"1rem"}}>
        <button type="submit" className="btn btn-primary" >
          Login
        </button>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
