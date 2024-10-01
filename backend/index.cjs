require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.MODE == "DEVELOPMENT" ? 8080: null
const LogsRouter = require("./routes/logs/index.cjs")
app.use(express.json())

const corsOptions = {
    origin: process.env.MODE == "DEVELOPMENT"? 3000 : process.env.FRONTEND_ROUTE,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.get("/",(req,res)=>{
    console.log(req.query)
    res.json({message:"Meow"})
})
app.use("/logs", LogsRouter)
app.listen(port, ()=>{
    console.log("Server is listening on ", port)
})