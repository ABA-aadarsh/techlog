require("dotenv").config()
const express = require("express")


const app = express()
const port = process.env.MODE == "DEVELOPMENT" ? 8080: null


app.listen(port, ()=>{
    console.log("Server is listening on ", port)
})