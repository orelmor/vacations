import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationStore } from "../Redux/VacationsState";
import { VacationsFilterActionType, vacationFilterStore } from "../Redux/VacationFilterState";

class VacationService {

  // Get all vacations
  async getAllVacationsASC(): Promise<VacationModel[]> {

    let vacations = vacationStore.getState().vacations
    if(vacations.length === 0){
      console.log("ajax all")
      // AJAX REQ
      const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

      // Extract data
      vacations = response.data

      // Save to global state
      vacationStore.dispatch({type:VacationsActionType.FetchVacations,payload:vacations})

    }
  
   
    return vacations;
  }

 
  

  // Get all Vacation followerd by user
  async getVacationsFollowedByUser(userCode: number): Promise<VacationModel[]> {
    // Following vacations state
    let vacations  = vacationFilterStore.getState().followingVacations

    // if not exists
    if(vacations.length === 0){
        const response = await axios.get<VacationModel[]>(appConfig.followedByUserUrl+ userCode)
        vacations = response.data
        vacationFilterStore.dispatch({type:VacationsFilterActionType.FetchFollowingVacations,payload:vacations})
    }
   
    return vacations
}


// Get vacations that did not start yet
async getFutureVacations():Promise<VacationModel[]>{

  //Future vacations state:
  let vacations = vacationFilterStore.getState().futureVacations
  if(vacations.length === 0) {
    const response = await axios.get<VacationModel[]>(appConfig.futureVacationsUrl)
     vacations = response.data
     vacationFilterStore.dispatch({type:VacationsFilterActionType.FetchFutureVacations,payload:vacations})
  }

    return  vacations
}

// Get all ongoing vacations
async  getActiveVacations(): Promise<VacationModel[]> {
    let vacations = vacationFilterStore.getState().activeVacations

    if(vacations.length === 0){
      const response = await axios.get<VacationModel[]>(appConfig.activeVacationsUrl)
       vacations = response.data
       vacationFilterStore.dispatch({type:VacationsFilterActionType.FetchActiveVacations,payload:vacations})
    }
   
    return vacations;
  }


}

const vacationService = new VacationService();

export default vacationService;
