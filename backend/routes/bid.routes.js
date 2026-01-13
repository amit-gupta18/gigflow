const express = require("express");
const bidRouter = express.Router();
const { createBid, getBids, hireBid } = require("../controllers/bid.controller");

// submit a bid for a gig
bidRouter.post("/" , createBid)

// get all bids for a gig
bidRouter.get("/:gigId" , getBids) // authenticated with user/owner  only 

// patch for hiring , atomic update , hire logic 
bidRouter.patch("/:bidId/hire" , hireBid)


module.exports = bidRouter;