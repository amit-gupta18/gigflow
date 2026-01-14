const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const gigRouter = require('./routes/gig.routes')
const bidRouter = require('./routes/bid.routes')
dotenv.config();

const PORT = process.env.PORT || 8000;

    
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://gigflow-amit.vercel.app'
    ],
    credentials: true
}));




async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}
// connecting to MongoDB 
connectDB();

app.use('/api/auth', authRouter)
app.use('/api/gigs', gigRouter)
app.use('/api/bids', bidRouter)

app.get("/", (req, res) => {
    res.json({ message: "Welcome to GigFlow API" })
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));