const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const morgan = require("morgan")
const connectDB = require("./config/db")

dotenv.config({path: "./config/config.env"})

connectDB();

const app = express();

const transactions = require('./routes/transactions')

app.use(express.json())

app.use('/api/v1/transactions', transactions)

// app.get('/', (req, res)=>{
//     res.send("get api runing")
// })

const POST = process.env.POST || 5000;

app.listen(POST, console.log(`server running in ${process.env.NODE_ENV} mode on port ${process.env.POST}`.yellow.bold))