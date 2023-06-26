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


    return (
        <div className="VacationCard">
            <FollowButton vacation={props.vacation}></FollowButton>
            <img src={appConfig.imagesUrl + props.vacation.imageName} alt={props.vacation.imageName}></img>
			 <h2>{props.vacation.destination}</h2><span>#{props.vacation.vacationCode}</span>
            <p>{props.vacation.description}</p>
            <p>{props.vacation.startDate}</p>
            <p>{props.vacation.endDate}</p>
            <p>{props.vacation.price}$</p>
            
        </div>
    );
}

export default VacationCard;
