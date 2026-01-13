function createBid(req, res) {
    res.send("createBid")
}

function getBids(req, res) {
    res.send("getBids")
}

function hireBid(req, res) {
    res.send("hireBid")
}

module.exports = { createBid, getBids, hireBid }