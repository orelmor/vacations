import { useEffect, useState } from "react";
import authService from "../../../../Services/AuthService";
import "./AuthMenu.css";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../../Redux/AuthState";
import UserModel from "../../../../Models/UserModel";


function AuthMenu(): JSX.Element {
    
    const [user, setUser] = useState<UserModel>()

    useEffect(()=>{
       setUser(authStore.getState().user)

       const unsubscribe = authStore.subscribe(()=>{
        setUser(authStore.getState().user)

       })
       return ()=> unsubscribe()
    },[])



    return (
        <div className="AuthMenu">
            {user ?
                <>
                <span>Hello {user.firstName} {user.lastName}</span>
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
