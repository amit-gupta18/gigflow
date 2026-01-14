const jwt = require("jsonwebtoken");
function middleware(req, res, next) {
    const token = req.cookies.token;
    // console.log("token in middleware " , token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = middleware
