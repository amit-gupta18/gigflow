const express = require("express");
const bidRouter = express.Router();
const { createBid, getBids, hireBid, rejectBid } = require("../controllers/bid.controller");
const authmiddleware = require("../middlewares/auth.middleware");

// submit a bid for a gig
bidRouter.post("/" , authmiddleware , createBid)

// get all bids for a gig
bidRouter.get("/:gigId" , authmiddleware , getBids) // authenticated with user/owner  only 

// patch for hiring , atomic update , hire logic 
bidRouter.patch("/:bidId/hire" , authmiddleware , hireBid)

// patch for rejecting a bid
bidRouter.patch("/:bidId/reject" , authmiddleware , rejectBid)

module.exports = bidRouter;