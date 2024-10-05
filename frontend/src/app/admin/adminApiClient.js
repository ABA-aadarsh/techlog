"use client";
"use strict"

const { getSession } = require("next-auth/react");

const apiClient = async (url="", options) =>{
    const session = await getSession()
    if(session && session.accessToken!=undefined && ((session.jwt.accessToken) instanceof String || typeof(session.jwt.accessToken) == "string")){
        throw new Error("Not logged in")
    }
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${session.jwt.accessToken}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
        ...options
    })
    return res
}

export default apiClient