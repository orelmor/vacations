import axios from "axios"
import VacationModel from "../Models/VacationModel"
import appConfig from "../Utils/AppConfig"
import { VacationsActionType, vacationStore } from "../Redux/VacationsState"

class ManagerService {


    public async getOneVacation(vacationCode:number):Promise<VacationModel>{
        let vacations = vacationStore.getState().vacations
        let vacation = vacations.find(v => v.vacationCode === vacationCode)
        if(!vacation){
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationCode)
            vacation = response.data
        }
        return vacation
        
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
         
        vacationStore.dispatch({type:VacationsActionType.AddVacation,payload:addedVacation})

    }

    public async updateVacation(vacation:VacationModel):Promise<void>{
        const myFormData = new FormData()
        myFormData.append("destination",vacation.destination)
        myFormData.append("description",vacation.description)
        myFormData.append("startDate",vacation.startDate)
        myFormData.append("endDate",vacation.endDate)
        myFormData.append("price",vacation.price.toString())
        myFormData.append("image",vacation.image[0])
        myFormData.append("imageName",vacation.imageName)

        
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationCode,myFormData)
        const updatedVacation = response.data

        vacationStore.dispatch({type:VacationsActionType.UpdateVacation,payload:updatedVacation})

    }

    public async deleteVacation(vacationCode:number):Promise<void>{
        await axios.delete(appConfig.vacationsUrl + vacationCode)
        vacationStore.dispatch({type:VacationsActionType.DeleteVacation,payload: vacationCode})
    }

}

const managerService = new ManagerService()

export default managerService