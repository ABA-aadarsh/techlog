const mongoose = require("mongoose")

const Connect_Database = async () =>{
    try{
        const DB_PW = process.env.DB_PW
        const DB_USER = process.env.DB_USER
        const DB_NAME = process.env.DB_NAME
        if(process.env.DB_URI==null){
            throw new Error("DB URI not passed")
        }
        const DB_URI = (process.env.DB_URI).replace("<pw>", DB_PW).replace("<user>", DB_USER).replace("<db>",DB_NAME)

        const db = await mongoose.connect(DB_URI, 
            {
                autoIndex: false
            }
        )
        console.log("Database connection was successful")
        return db
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = Connect_Database