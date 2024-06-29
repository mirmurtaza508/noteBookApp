const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Murtazaisagoodb$oy';

// Route1 create a userusing: PST "/api/auth/". Doesnt't require Auth


router.post("/createuser",[
    body('name',"enter a vaild name").isLength({ min: 3 }),
    body('email',"Enter a email name").isEmail(),
    body('password',"password must be aleast 5 characters").isLength({ min: 5 }),
    
], async (req,res)=>{
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    // let user = await User.create
// Cjeack whether the user with this email  exists already
try{
let user = await User.findOne({email: req.body.email});
if(user){
return  res.status(400).json({success,error: "Sorry a user with this email already exists"})
}
const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password, salt) ;
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,

      })
    //   .then(user => res.json(user))
    //   .catch((err)=> {console.log(err)
    //   res.json({error: "please enter a unique value for email",message: err.message})});

    // res.send(req.body)
    const data = {
        user:{
            id:user.id
        }
    }
  const authToken =   jwt.sign(data, JWT_SECRET);
//   console.log(jwtData)
success=true;
res.json({success,authToken: authToken})
    // res.json({"Nice":"nice"})
}catch(error){
    console.error(error.message);
    console.log(error);
    res.status(500).send("Internal server  error occured")

}
})
//Route2 Authenticate a userusing: PST "/api/auth/Login". Doesnt't require Auth
router.post("/Login",[
    body('email',"Enter a email name").isEmail(), 
    body('password',"Password Cannot be blank").exists(), 

], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success= false;
      return res.status(400).json({ success,errors: errors.array() });
    }


const {email,password} = req.body;

try {
    let user = await User.findOne({email});
    if(!user){
        success = false;
        return res.status(400).json({success,error: "Please try to login with correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password)
    if(!passwordCompare){
        success = false;
        return res.status(400).json({success,error: "Please try to login with correct credentials"});
    }
    const data = {
        user:{
            id:user.id
        }
    }
  const authToken =   jwt.sign(data, JWT_SECRET);
  success = true;
  res.json({success,authToken: authToken})
} catch (error) {
    console.error(error.message);
    // console.log(error);
    res.status(500).send("Internal server  error occured")
}
})

//Route2 get loggedin User Details using: PST "/api/auth/getuser". Login required
router.post("/getuser",fetchuser,async (req,res)=>{
try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message);
    // console.log(error);
    res.status(500).send("Internal server  error occured")
}
})


module.exports = router;