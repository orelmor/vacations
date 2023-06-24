import axios from "axios"
import FollowerModel from "../Models/FollowerModel"
import appConfig from "../Utils/AppConfig"

class FollowService{

    public async countFollowers(vacationCode:number):Promise<number>{
        const response = await axios.get<number>(appConfig.numOfFollowersUrl + vacationCode)
        return response.data
    }


    public async follow(userCode:number,vacationCode:number):Promise<void>{
        const response = await axios.post<FollowerModel>(appConfig.addToFavUrl + userCode +"/" + vacationCode)

    }

    public async unfollow(userCode:number,vacationCode:number):Promise<void>{
        await axios.delete(appConfig.removeFromFavUrl +userCode +"/" + vacationCode)
        
    }
}

const followService = new FollowService()
export default followService