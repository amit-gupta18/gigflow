// fetching all the gigs 
function fetchAllGigs(req , res){
    res.send("fetchAllGigs")
}

// creating a new gig 
function createGig(req , res){
    res.send("createGig")
}   

module.exports = {fetchAllGigs , createGig}