import { useEffect } from "react";
import "./Logout.css";
import authService from "../../../../Services/AuthService";
import notificationService from "../../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";

function Logout(): JSX.Element {

    const navigate = useNavigate()

    useEffect(() => {
        authService.logout()
        notificationService.succees("Bye Bye...")
        navigate('/login')
    },[])

    return null;
}

export default Logout;
