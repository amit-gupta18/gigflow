const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
dotenv.config();

const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    },
    {
        origin: 'https://gigflow-amit.vercel.app',
        credentials: true
    }
));

console.log("loggin monogo uri " , process.env.MONGO_URI)

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


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));