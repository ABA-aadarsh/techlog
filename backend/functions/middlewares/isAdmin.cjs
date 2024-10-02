const {isAdmin} = require("../libs.cjs")

const isAdminMiddleware = async (req,res,next)=>{
    console.log("Middleware was called")
    if(isAdmin(req)){
        return next();
    }
    return res.status(403).json(
        {
            message: "Not authorised"
        }
    )
}

module.exports = isAdminMiddleware