import { NavLink } from "react-router-dom";
import "./Menu.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<ol>
                <NavLink to='/vacationList'>Vacations</NavLink>
                <NavLink to='/vacationManager'>Manager page</NavLink>
                <NavLink to='/reports'>Reports</NavLink>
            </ol>
            <AuthMenu></AuthMenu>
        </div>
    );
}

export default Menu;
