import { useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import appConfig from "../../../../Utils/AppConfig";
import "./VacationCard.css";
import UserModel from "../../../../Models/UserModel";
import { authStore } from "../../../../Redux/AuthState";
import notificationService from "../../../../Services/NotificationService";
import followService from "../../../../Services/FollowService";
import FollowButton from "../FollowButton/FollowButton";

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
            <div className="desc">
            <p>{props.vacation.description}</p>
            </div>
            <div className="date">
            <span>{props.vacation.startDate}-</span>
            <span>{props.vacation.endDate}</span>
            </div>
            <div className="price">
            <p>{props.vacation.price}$</p>
            </div>
            
        </div>
    );
}

export default VacationCard;
