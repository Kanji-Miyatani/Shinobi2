import { useEffect, useState } from "react"
import authApi from '../api/auth'

export const useAuthorize=()=>{
    const [authorized,setAuthorized] = useState(false);
    useEffect(()=>{
        authApi().then((data)=>{
            setAuthorized(data.result);
        })
    },[])
    return {
        authorized:authorized,
    }
}