import { useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import "./FollowButton.css";
import UserModel from "../../../../Models/UserModel";
import { authStore } from "../../../../Redux/AuthState";
import notificationService from "../../../../Services/NotificationService";
import followService from "../../../../Services/FollowService";

interface FollowButtonProps {
	vacation:VacationModel
}

function FollowButton(props: FollowButtonProps): JSX.Element {

    const [user,setUser] = useState<UserModel>()
    const [isFollowing, setIsFollowing] = useState<boolean>(props.vacation.isFollowing)
    const [followersCount,setFollowersCount] = useState<number>(props.vacation.followersCount)

    useEffect(()=>{
        setUser(authStore.getState().user)
       
    },[])

    async function setFavorite() {
        try {
            if(isFollowing){
                await followService.unfollow(user.userCode,props.vacation.vacationCode)
                setIsFollowing(false)
                setFollowersCount(followersCount -1)
            }else{
                await followService.follow(user.userCode,props.vacation.vacationCode)
                setIsFollowing(true)
                setFollowersCount(followersCount +1)
            }
            
            
        } catch (err:any) {
            notificationService.error(err)
        }
       
    }

    return (
        <div className="FollowButton">
            {isFollowing ? 
                <button onClick={()=>{setFavorite()}}>+ Unfollow</button>
                :
                 <button onClick={()=>{setFavorite()}}>+ Follow </button>
            }
             
              
              
            
			
            <p>{followersCount} Following</p>
        </div>
    );
}

export default FollowButton;
