import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authStore } from "../Redux/AuthState"
import notificationService from "../Services/NotificationService"

function useVerifyLoggedout(){
    const navigate = useNavigate()

    useEffect(()=>{
        if(authStore.getState().token){
            notificationService.error("You are already logged in")
            if(authStore.getState().user.role=== "Admin"){
                navigate("/vacationManager")
            } else{
                navigate("/vacationList")
            }
          
        }
    },[])

}

export default useVerifyLoggedout