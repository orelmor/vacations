import axios from "axios"
import VacationModel from "../Models/VacationModel"
import appConfig from "../Utils/AppConfig"

class ManagerService {


    public async getOneVacation(vacationCode:number):Promise<VacationModel>{
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationCode)
        return response.data
    }

    public async addVacation(vacation:VacationModel):Promise<void>{
        const myFormData = new FormData()
        myFormData.append("destination",vacation.destination)
        myFormData.append("description",vacation.description)
        myFormData.append("startDate",vacation.startDate)
        myFormData.append("endDate",vacation.endDate)
        myFormData.append("price",vacation.price.toString())
        myFormData.append("image",vacation.image[0])

        const response = await axios.post<VacationModel>(appConfig.vacationsUrl,myFormData)
        const addedVacation = response.data

    }

    public async updateVacation(vacation:VacationModel):Promise<void>{
        const myFormData = new FormData()
        myFormData.append("destination",vacation.destination)
        myFormData.append("description",vacation.description)
        myFormData.append("startDate",vacation.startDate)
        myFormData.append("endDate",vacation.endDate)
        myFormData.append("price",vacation.price.toString())
        myFormData.append("image",vacation.image[0])
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationCode,myFormData)
        const updatedVacation = response.data
    }

    public async deleteVacation(vacationCode:number):Promise<void>{
        await axios.delete(appConfig.vacationsUrl + vacationCode)
    }

}

const managerService = new ManagerService()

export default managerService