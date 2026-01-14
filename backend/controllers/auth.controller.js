const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



// signup controller 
async function register(req, res) {
    const { name, email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        return res.status(400).json({ message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // console.log("token from register controller" , token)
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return res.status(201).json({
        message: "user registered successfully",
        token: token,
        user: { id: user._id, name: user.name, email: user.email }
    })
}

// signin controller 
async function login(req, res) {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(400).json({ message: "User not found" })
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" })
    }
    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET);
    // console.log("token from login controller" , token)
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.json({
        message: "user logged in successfully",
        token: token,
        user: { id: foundUser._id, name: foundUser.name, email: foundUser.email }
    })
}

// get current user
async function getMe(req, res) {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log("User from DB:", { id: user._id, name: user.name, email: user.email });
        res.json({ user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { register, login, getMe }
