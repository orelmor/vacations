import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authStore } from "../Redux/AuthState"
import notificationService from "../Services/NotificationService"

function useVerifyLoggedIn(){
    const navigate = useNavigate()

    useEffect(()=>{
        if(!authStore.getState().token){
            notificationService.error("Accessable only for loggen in users")
            navigate("/login")
        }
    },[])

}

export default useVerifyLoggedIn