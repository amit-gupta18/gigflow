const express = require("express");
const gigRouter = express.Router();
const { fetchAllGigs, createGig } = require("../controllers/gig.controller");

// listing out all the available gigs
gigRouter.get("/" , fetchAllGigs)

// creating a new gig 
gigRouter.post("/" , createGig)



module.exports = gigRouter;