const Gig = require("../models/gig.model")
// fetching all the gigs 
async function fetchAllGigs(req , res){
    
    const allgigs = await Gig.find();
    return res.status(200).json({
        message : "all gigs fetched successfully" ,
        gigs : allgigs
    })

}

// creating a new gig 
async function createGig(req , res){
    // title  , desc , budget , ownerId , status ( open by default || assigned)
    const {title , description , budget , ownerId} = req.body;
    const gig = await Gig.create({
        title , 
        description , 
        budget , 
        ownerId , 
        status : "open"
    })

    return res.status(201).json({
        message : "gig created successfully" ,
        gig : gig
    })
}   

module.exports = {fetchAllGigs , createGig}