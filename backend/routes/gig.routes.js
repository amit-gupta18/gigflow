const express = require("express");
const gigRouter = express.Router();
const { fetchAllGigs, createGig } = require("../controllers/gig.controller");
const authmiddleware = require("../middlewares/auth.middleware");

// listing out all the available gigs
gigRouter.get("/" ,  authmiddleware ,  fetchAllGigs)

// creating a new gig 
gigRouter.post("/" , authmiddleware  , createGig)



module.exports = gigRouter;