const express = require("express");
const authRouter = express.Router();
const { register, login, getMe } = require("../controllers/auth.controller");
const  authmiddleware = require("../middlewares/auth.middleware");

// signin route 
authRouter.post('/register', register)

// signup route 
authRouter.post('/login', login);

// get current user
authRouter.get('/me', authmiddleware , getMe);

module.exports = authRouter;