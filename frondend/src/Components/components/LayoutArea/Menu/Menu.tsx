import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<ol>
                <NavLink to='/vacationList'>Vacations</NavLink>
                <NavLink to='/vacationManager'>Manager page</NavLink>
                <NavLink to='/reports'>Reports</NavLink>
            </ol>
        </div>
    );
}

export default Menu;
