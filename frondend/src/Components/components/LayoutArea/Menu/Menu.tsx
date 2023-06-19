import { NavLink } from "react-router-dom";
import "./Menu.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useEffect, useState } from "react";
import authService from "../../../../Services/AuthService";
import { authStore } from "../../../../Redux/AuthState";

function Menu(): JSX.Element {

// i want to checke weather the user is admin or user

    const [isAdmin,setIsAdmin] = useState<boolean>()

    const [isLoggedIn, setIsloggedIn] =useState<boolean>()

    useEffect(()=>{
        setIsloggedIn(authService.isLoggedIn())
        // work here later
        
        if(isLoggedIn){
            setIsAdmin(authService.isAdmin())
        }
    },[])

    return (
        <div className="Menu">
            {/* If is admin render this menu */}
            {isAdmin && <ol>
                <NavLink to='/vacationManager'>Manager page<span> |</span></NavLink>
                
                <NavLink to='/reports'> Reports</NavLink>
                
                <NavLink to='/addVacation'><span> |</span> Post new vacation</NavLink>
            </ol>}

            {/* If is user render this menu  */}
            {!isAdmin && <>
            <br />
                <NavLink to='/vacationList'>Vacations</NavLink>
            </>}
			
               
            
            <AuthMenu></AuthMenu>
        </div>
    );
}

export default Menu;
