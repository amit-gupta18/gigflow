const Bid = require("../models/bid.model")
const Gig = require("../models/gig.model")


async function createBid(req, res) {
    try {
        const bid = await Bid.create(req.body)
        res.status(201).json(bid)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// all the bids of the particular gig passed in the gigId 
async function getBids(req, res) {
    try {
        // find all the bids of the particular gig passed in the gigId 
        const gig = await Gig.findById(req.params.gigId) // find the gig by id
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" })
        }
        /// from the gigID now fetch all the bids 
        const bids = await Bid.find({ gigId: gig._id })
        res.status(200).json(bids)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// /api/bids/:bidid/hire
async function hireBid(req, res) {
    try {
        const bid = await Bid.findById(req.params.bidid)
        if (!bid) {
            return res.status(404).json({ message: "Bid not found" })
        }
        bid.status = "hired"
        await bid.save()
        res.status(200).json(bid)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createBid, getBids, hireBid }