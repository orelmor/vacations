import axios from "axios"
import appConfig from "../Utils/AppConfig"
import UserModel from "../Models/UserModel"
import CredentialsModel from "../Models/CredentialsModel"

class AuthService {
    public async  register(user:UserModel):Promise<void> {
        const  response = await axios.post<string>(appConfig.registerUrl,user)
        const token = response.data

    }

    
    public async  login(credentials:CredentialsModel):Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl,credentials)
        const token = response.data
        
    }

    public  logout():void{
        alert("heelo")
    }


}

const authService = new AuthService()

export default authService