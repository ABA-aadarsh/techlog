require("dotenv").config()
const express = require("express")


const app = express()
const port = process.env.MODE == "DEVELOPMENT" ? 8080: null

app.use(express.json())
app.get("/",(req,res)=>{
    console.log(req.query)
    res.json({message:"Meow"})
})

app.listen(port, ()=>{
    console.log("Server is listening on ", port)
})