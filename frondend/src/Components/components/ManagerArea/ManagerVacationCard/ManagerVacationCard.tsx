import VacationModel from "../../../../Models/VacationModel";
import "./ManagerVacationCard.css";
import appConfig from "../../../../Utils/AppConfig";
import { NavLink, useNavigate } from "react-router-dom";
import managerService from "../../../../Services/ManagerService";
import notificationService from "../../../../Services/NotificationService";
import moment from "moment";




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

    
    
    const cardStyle = {
        backgroundImage: `url(${appConfig.imagesUrl + props.vacation.imageName})`,
      };
    return (
        <div className="ManagerVacationCard" style={cardStyle}>
            <div className="options">
             <NavLink to={"/updateVacation/" + props.vacation.vacationCode}>🖊</NavLink>
             <span> | </span>
            <button  onClick={()=> deleteMe(props.vacation.vacationCode)}>✖</button>
            </div>
           
            <h2>{props.vacation.destination}</h2><br />
            <div className="date">
            <span>📅 {moment(props.vacation.startDate).format("DD/MM/YYYY")}-</span>
            <span> {moment(props.vacation.endDate).format("DD/MM/YYYY")}</span>
            </div>
            <div className="desc">
            <p>{props.vacation.description}</p>
            </div>
           
            <div className="price">
            <p>{props.vacation.price}$</p>
            </div>
          
           

        </div>
    );
}

export default ManagerVacationCard;
