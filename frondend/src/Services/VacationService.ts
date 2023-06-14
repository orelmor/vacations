import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";

class VacationService {
  async getAllVacationsASC(): Promise<VacationModel[]> {
    const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
    const vacations = response.data;
    return vacations;
  }

  // Get all Vacation followerd by user
  async getVacationsFollowedByUser(userCode: number): Promise<VacationModel[]> {
    const response = await axios.get<VacationModel[]>(appConfig.followedByUserUrl+ userCode)
    const vacations = response.data
    return vacations
}


// Get vacations that did not start yet
async getFutureVacations():Promise<VacationModel[]>{
    const response = await axios.get<VacationModel[]>(appConfig.futureVacationsUrl)
    const vacations = response.data
    return  vacations
}

// Get all ongoing vacations
async  getActiveVacations(): Promise<VacationModel[]> {
    const response = await axios.get<VacationModel[]>(appConfig.activeVacationsUrl)
    const vacations = response.data
    return vacations;
  }


}

const vacationService = new VacationService();

export default vacationService;
