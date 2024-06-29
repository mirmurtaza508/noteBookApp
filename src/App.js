import "./App.css";
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/note/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  let [alert, setAlert] = useState(null);
  function showAlert(message, type){
    setAlert({
      message : message,
      type : type,
    })
    setTimeout(() => {
     setAlert(null)
  }, 2000);
  }
  return (
    <div style={{paddingBottom:"2.3rem",margin:"0",height:"100%",background:"url(https://t3.ftcdn.net/jpg/04/91/48/46/240_F_491484654_emJO3RMbetykchXLN0bolVLISDvnsg0v.jpg)",backgroundSize:"cover",backgroundPosition:"center",objectFit:"cover"}}>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} ></Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
