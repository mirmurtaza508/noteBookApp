import React,{useState} from "react";
import {Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCreadentials] = useState({name:"",email:"",password:"",cpassword:""});
  let navigate = useNavigate();
    const handleSumbit = async (evt) =>{
        evt.preventDefault();
       const  {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, email, password}),
      });
      const json = await response.json();
      console.log(json)
      if(json.success){
        //Save the Auth token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/Login")
        props.showAlert("Account Created Successfully","success")

      }else{
        // alert("Invalid creadentails")
        props.showAlert("Invalid details","danger")

      }
    }
    const onchange = (evt) => {
      setCreadentials({...credentials, [evt.target.name]: evt.target.value });
      if(evt.target.id === "password"){
        document.querySelector("#btn-pass").style.display = "block";
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
    <div className=" d-flex justify-content-center" style={{color:"white",height:"80vh"}}>
      <div style={{width:"20rem", height:"25rem",background:"rgba(0,0,0,0.4)",padding:"2rem",borderRadius:"1rem",zIndex:"1"}}>
      <h2 className="text-center">signUp</h2>
      <form onSubmit={handleSumbit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter Your Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onchange}
            id="name"
            aria-describedby="emailHelp"
            name="name"
            style={{background:"#d3d3d3"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onchange}
            id="email"
            aria-describedby="emailHelp"
            name="email"
            style={{background:"#d3d3d3"}}
          />
          {/* <div id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="form-control" style={{display:"flex",background:"#d3d3d3"}}>
          <input
            type="password"
            onChange={onchange}
            id="password"
            name="password"
            minLength={5}
            required
            style={{background:"transparent",flex:"1",border:"0",outline:"0",boxShadow:"none"}}
          />
          <span id="btn-pass" onClick={handleShow} style={{width:"2rem",display:"none",cursor:"pointer",background:"url(https://icon-library.com/images/show-password-icon/show-password-icon-18.jpg )",backgroundPosition:"center",backgroundSize:"contain"}}/>
          </div>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
           Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onchange}
            id="cpassword"
            name="cpassword"
            minLength={5}
            required
          />
        </div> */}
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Signup;
