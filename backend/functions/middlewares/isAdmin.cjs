import { isAdmin } from "../libs.cjs"

const isAdminMiddleware = async (req,res,next)=>{
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