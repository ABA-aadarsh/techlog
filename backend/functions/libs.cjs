const JWT = require("jsonwebtoken")
const isAdmin = (req) => {
    try{

        const headers = req.headers
        if(!headers.hasOwnProperty("authorization")){
            return false
        }
        const AuthorizationToken = headers.authorization.split(" ")
        if(!AuthorizationToken[1]) return false;
        const jwtToken = AuthorizationToken[1]
        const adminAuthenticated = JWT.verify(jwtToken, process.env.JWT_SECRET_KEY) //secret key is same as NEXT_SECRET in frontend
        if(adminAuthenticated){
            return true
        }
        console.log(headers)
        return false
    }catch(error){
        console.log(error.message)
        return false
    }
}

const isObjectRequirementFullfilled = (obj, properties=[])=>{
    // check is obj has all properties
    for(let i=0; i<properties.length; i++){
        if(!obj.hasOwnProperty(properties[i])) return false
    }
    return true
}

module.exports = {isAdmin, isObjectRequirementFullfilled}