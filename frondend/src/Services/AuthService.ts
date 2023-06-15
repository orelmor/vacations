import axios from "axios"
import appConfig from "../Utils/AppConfig"
import UserModel from "../Models/UserModel"
import CredentialsModel from "../Models/CredentialsModel"
import { AuthActionType, authStore } from "../Redux/AuthState"

class AuthService {
    public async  register(user:UserModel):Promise<void> {
        const  response = await axios.post<string>(appConfig.registerUrl,user)
        const token = response.data
        authStore.dispatch({type:AuthActionType.Register,payload:token})

    }

    
    public async  login(credentials:CredentialsModel):Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl,credentials)
        const token = response.data
        authStore.dispatch({type:AuthActionType.Login, payload:token})
        
    }

    public logout():void{
        authStore.dispatch({type:AuthActionType.Logout})
    }


    public isLoggedIn():boolean{
       return authStore.getState().token !== null // If is not null the user is logged in
    }


}

const authService = new AuthService()

export default authService