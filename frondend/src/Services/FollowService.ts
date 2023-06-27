import axios from "axios"
import FollowerModel from "../Models/FollowerModel"
import appConfig from "../Utils/AppConfig"
import { VacationsActionType, vacationStore } from "../Redux/VacationsState"
import { VacationsFilterActionType, vacationFilterStore } from "../Redux/VacationFilterState"

class FollowService{

    public async countFollowers(vacationCode:number):Promise<number>{
        const response = await axios.get<number>(appConfig.numOfFollowersUrl + vacationCode)
        return response.data
    }


    public async follow(userCode:number,vacationCode:number):Promise<void>{
        const response = await axios.post<FollowerModel>(appConfig.addToFavUrl + userCode +"/" + vacationCode)

        //Update both redux with follow
        vacationStore.dispatch({type:VacationsActionType.Follow,payload:vacationCode})
        vacationFilterStore.dispatch({type:VacationsFilterActionType.Follow,payload:vacationCode})

    }

    public async unfollow(userCode:number,vacationCode:number):Promise<void>{
        await axios.delete(appConfig.removeFromFavUrl +userCode +"/" + vacationCode)

        //Update both redux with unfollow
        vacationStore.dispatch({type:VacationsActionType.Unfollow,payload:vacationCode})
        vacationFilterStore.dispatch({type:VacationsFilterActionType.Unfollow,payload:vacationCode})
       
    }
}

const followService = new FollowService()
export default followService