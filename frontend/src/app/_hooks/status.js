"use client";
import { useState } from "react";

const useStatus =  ({e=false,l=true}) => {
    const [loading,setLoading]= useState(l)
    const [error, setError] = useState(e)
    return {loading,setLoading,error,setError};
}

export default useStatus