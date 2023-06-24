import { useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import appConfig from "../../../../Utils/AppConfig";
import "./VacationCard.css";
import UserModel from "../../../../Models/UserModel";
import { authStore } from "../../../../Redux/AuthState";
import notificationService from "../../../../Services/NotificationService";
import followService from "../../../../Services/FollowService";

interface VacationCardProps{
    vacation:VacationModel
}

function VacationCard(props:VacationCardProps): JSX.Element {

    const [user,setUser] = useState<UserModel>()
    const [countFollowers , setCountFollowers] = useState<number>(0)

    useEffect(()=>{
        followService.countFollowers(props.vacation.vacationCode)
            .then(c=> setCountFollowers(c))
            .catch(err=> notificationService.error(err))
        setUser(authStore.getState().user)
        const unsub = authStore.subscribe(()=>{
            setUser(authStore.getState().user)

        })
        return unsub
    },[])

    async function addToFav(userCode:number, vacationCode:number){
        try {
            await followService.follow(userCode,vacationCode)
        } catch (err:any) {
            notificationService.error(err)
        }
    }

    return (
        <div className="VacationCard">
            {/* Send follow details to server */}
            <button onClick={()=> addToFav(user.userCode,props.vacation.vacationCode)}>Follow</button>
            <p>{countFollowers} Following</p>
            
			 <h2>{props.vacation.destination}</h2><span>#{props.vacation.vacationCode}</span>
            <p>{props.vacation.description}</p>
            <p>{props.vacation.startDate}</p>
            <p>{props.vacation.endDate}</p>
            <p>{props.vacation.price}$</p>
            <img src={appConfig.imagesUrl + props.vacation.imageName} alt={props.vacation.imageName}></img>
        </div>
    );
}

export default VacationCard;
