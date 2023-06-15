import { useEffect, useState } from "react";
import authService from "../../../../Services/AuthService";
import "./AuthMenu.css";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../../Redux/AuthState";


function AuthMenu(): JSX.Element {
    
    const [isLoggedIn, setIsloggedIn] = useState<boolean>()

    useEffect(()=>{
        setIsloggedIn(authService.isLoggedIn())
        
        const unsubscribe = authStore.subscribe(()=>{
            setIsloggedIn(authService.isLoggedIn())
        })
        return unsubscribe
    },[])



    return (
        <div className="AuthMenu">
            {isLoggedIn ?
                <>
        
                 <NavLink to='/logout'>Logout</NavLink>
                    
                </>:
                <>
                    <span>Hello Guest</span> <br />
                    <NavLink to='/login'>Login</NavLink>
                    <span> | </span>
                    <NavLink to='/register'>Register</NavLink>
                    
                </>}


        </div>
    );
}

export default AuthMenu;
