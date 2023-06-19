import { NavLink } from "react-router-dom";
import "./Menu.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useEffect, useState } from "react";
import authService from "../../../../Services/AuthService";
import { authStore } from "../../../../Redux/AuthState";
import UserModel from "../../../../Models/UserModel";

function Menu(): JSX.Element {

// i want to checke weather the user is admin or user

    const [user,setUser] = useState<UserModel>()


    useEffect(()=>{
        setUser(authStore.getState().user)
        const unsub = authStore.subscribe(()=>{
            setUser(authStore.getState().user)

        })
        return unsub
        
    },[])

    return (
        <div className="Menu">
            {/* If is admin render this menu */}
            {user?.role === "Admin" && <ol>
                <NavLink to='/vacationManager'>Manager page<span> |</span></NavLink>
                
                <NavLink to='/reports'> Reports</NavLink>
                
                <NavLink to='/addVacation'><span> |</span> Post new vacation</NavLink>
            </ol>}

            {/* If is user render this menu  */}
            {user?.role === "User" && <>
            <br />
                <NavLink to='/vacationList'>Vacations</NavLink>
            </>}
			
               
            
            <AuthMenu></AuthMenu>
        </div>
    );
}

export default Menu;
