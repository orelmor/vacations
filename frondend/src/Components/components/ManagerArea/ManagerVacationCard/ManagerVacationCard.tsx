import VacationModel from "../../../../Models/VacationModel";
import "./ManagerVacationCard.css";
import appConfig from "../../../../Utils/AppConfig";
import { NavLink, useNavigate } from "react-router-dom";
import managerService from "../../../../Services/ManagerService";
import notificationService from "../../../../Services/NotificationService";
import dateFormator from "../../../../Services/DateFormattor";




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
            {/* <img src={appConfig.imagesUrl + props.vacation.imageName} alt={props.vacation.imageName}></img> */}
            <h2>{props.vacation.destination}</h2><br />
            <div className="desc">
            <p>{props.vacation.description}</p>
            </div>
            <div className="date">
            <span>{dateFormator.formatDate( props.vacation.startDate)}-</span>
            <span>{dateFormator.formatDate( props.vacation.endDate)}</span>
            </div>
            <div className="price">
            <p>{props.vacation.price}$</p>
            </div>
          
           

        </div>
    );
}

export default ManagerVacationCard;
