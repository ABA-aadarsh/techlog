const JWT = require("jsonwebtoken")
const isAdmin = (req) => {
    const headers = req.headers
    if(!headers.hasOwnProperty("authorization")){
        return false
    }
    const AuthorizationToken = headers.authorization.split(" ")
    if(!AuthorizationToken[1]) return false;
    const jwtToken = AuthorizationToken[1]
    const adminAuthenticated = JWT.verify(jwtToken, process.env.SECRET_KEY) //secret key is same as NEXT_SECRET in frontend
    if(adminAuthenticated){
        return true
    }
    return false
}


module.exports = {isAdmin}