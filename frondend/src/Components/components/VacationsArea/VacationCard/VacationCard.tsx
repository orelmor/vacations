import VacationModel from "../../../../Models/VacationModel";
import appConfig from "../../../../Utils/AppConfig";
import "./VacationCard.css";

import FollowButton from "../FollowButton/FollowButton";
import moment from "moment";

interface VacationCardProps{
    vacation:VacationModel
}

function VacationCard(props:VacationCardProps): JSX.Element {
    const cardStyle = {
        backgroundImage: `url(${appConfig.imagesUrl + props.vacation.imageName})`,
      };

    return (
        <div className="VacationCard" style={cardStyle}>
            <div className="options">
            <FollowButton vacation={props.vacation} isFollowing={props.vacation.isFollowing}></FollowButton>
            </div>
            <h2>{props.vacation.destination}</h2><br />
            <div className="date">
            <span>📅{moment(props.vacation.startDate).format("DD/MM/YYYY") }-</span>
            <span>{moment(props.vacation.endDate).format("DD/MM/YYYY") }</span>
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

export default VacationCard;
