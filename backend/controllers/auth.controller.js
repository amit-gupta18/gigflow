const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



// signup controller 
async function register(req , res){
    const {email , password} = req.body;
    const foundUser = await User.findOne({email});
    if(foundUser){
        return res.status(400).json({message : "User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password , 10);
    const user = await User.create({email , password : hashedPassword})
    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET);
    // console.log("token from register controller" , token)
    res.cookie("token" , token);
    return res.status(201).json({
        message : "user registered successfully" ,
        token : token
    })
}

// signin controller 
async function login(req , res){
    const {email , password} = req.body;

    const foundUser = await User.findOne({email});
    if(!foundUser){
        return res.status(400).json({message : "User not found"})
    }
    const isPasswordValid = await bcrypt.compare(password , foundUser.password);
    if(!isPasswordValid){
        return res.status(400).json({message : "Invalid password"})
    }
    const token = jwt.sign({id : foundUser._id} , process.env.JWT_SECRET);
    // console.log("token from login controller" , token)
    res.cookie("token" , token);
    res.json({
        message : "user logged in successfully" ,
        token : token
    })
}


module.exports = {register , login}
