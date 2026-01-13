const express = require("express");
const authRouter = express.Router();
const { register, login } = require("../controllers/auth.controller");

// signin route 
authRouter.post('/register', register)

// signup route 
authRouter.post('/login',  login);

module.exports = authRouter;