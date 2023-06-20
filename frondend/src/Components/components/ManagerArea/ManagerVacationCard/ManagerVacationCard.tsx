import VacationModel from "../../../../Models/VacationModel";
import "./ManagerVacationCard.css";
import appConfig from "../../../../Utils/AppConfig";
import { NavLink, useNavigate } from "react-router-dom";
import managerService from "../../../../Services/ManagerService";
import notificationService from "../../../../Services/NotificationService";



interface ManagerVacationCardProps {
    vacation:VacationModel
}

function ManagerVacationCard(props:ManagerVacationCardProps): JSX.Element {
const navigate= useNavigate()

    async function deleteMe(code:number) {
        try {
            if(window.confirm("Are you sure you want to delete this vacation?")){
                await managerService.deleteVacation(code)
                navigate("/vacationManager")
                
            }
            
        } catch (err:any) {
            notificationService.error(err)
        }
    }

    

    return (
        <div className="ManagerVacationCard">
             <NavLink to={"/updateVacation/" + props.vacation.vacationCode}>🖊</NavLink>
            <NavLink to={"/#"} onClick={()=> deleteMe(props.vacation.vacationCode)}>✖</NavLink>
            <h2>{props.vacation.destination}</h2><span>#{props.vacation.vacationCode}</span>
            <p>{props.vacation.description}</p>
            <p>{props.vacation.startDate}</p>
            <p>{props.vacation.endDate}</p>
            <p>{props.vacation.price}$</p>
            <img src={appConfig.imagesUrl + props.vacation.imageName} alt={props.vacation.imageName}></img>
           

        </div>
    );
}

export default ManagerVacationCard;
