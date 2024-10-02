"use client";

const { getSession } = require("next-auth/react");

const apiClient = async (url="", options) =>{
    const session = await getSession()
    console.log(session)
    if(session && session.jwt){
        throw new Error("Not logged in")
    }
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${session.jwt}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
        ...options
    })
    return res
}

export default apiClient