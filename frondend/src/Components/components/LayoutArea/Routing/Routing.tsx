import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import Reports from "../../ManagerArea/Reports/Reports";
import VacationsManager from "../../ManagerArea/VacationsManager/VacationsManager";
import AddNewVacation from "../../ManagerArea/AddNewVacation/AddNewVacation";
import UpdateVacation from "../../ManagerArea/UpdateVacation/UpdateVacation";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Logout from "../../AuthArea/Logout/Logout";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Manager Routes */}
                <Route path="/vacationManager" element={<VacationsManager />}></Route>
                <Route path="/reports" element={<Reports />}></Route>
                <Route path="/addVacation" element={<AddNewVacation />}></Route>
                <Route path="/updateVacation" element={<UpdateVacation />}></Route>


                {/* User's Routes */}
                <Route path="/vacationList" element={<VacationList />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/logout" element={<Logout />}></Route>

                {/* Default route */}
                <Route path="/" element={<Login />}></Route>

                {/* Page not found */}
                <Route path="*" element={<PageNotFound />}></Route>





            </Routes>
        </div>
    );
}

export default Routing;
