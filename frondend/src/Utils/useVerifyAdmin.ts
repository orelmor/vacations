import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authStore } from "../Redux/AuthState"
import notificationService from "../Services/NotificationService"

function useVerifyAdmin(){
    const navigate = useNavigate()

    useEffect(()=>{
        if(authStore.getState().user?.role !== "Admin"){
            notificationService.error("Accessable only for admins")
            navigate("/vacationList")
        }
    },[])

}

export default useVerifyAdmin