import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";
import dateFormator from "../Services/DateFormator";

export class VacationState {
    public vacations:VacationModel[] = []

   
}

export enum VacationsActionType {
    FetchVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation,
    Follow,
    Unfollow
}

export interface VacationsAction{
    type:VacationsActionType,
    payload: any
}

export function vacationsReducer(currentState = new VacationState(),action:VacationsAction):VacationState{
    const newState = {...currentState}
    
    switch(action.type){
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload
            break
        case VacationsActionType.AddVacation:
            
            newState.vacations.push(action.payload)
            break
        case VacationsActionType.UpdateVacation:
            let indexToUpdate = newState.vacations.findIndex(v=> v.vacationCode === action.payload.vacationCode)
            if(indexToUpdate >= 0){
                newState.vacations[indexToUpdate] = action.payload
            }
            break
        case VacationsActionType.DeleteVacation:
            let indexToDelete = newState.vacations.findIndex(v=> v.vacationCode === action.payload)
        
            if(indexToDelete >= 0){
                newState.vacations.splice(indexToDelete,1)
            }
            break
        case VacationsActionType.Follow:
            const indexToUpdateFollow = newState.vacations.findIndex(v=> v.vacationCode === action.payload)
            if(indexToUpdateFollow >= 0 ){
                newState.vacations[indexToUpdateFollow].isFollowing = true
                newState.vacations[indexToUpdateFollow].followersCount ++
            }
            break
        case VacationsActionType.Unfollow:
            const indexToUpdateUnFollow = newState.vacations.findIndex(v=> v.vacationCode === action.payload)
            if(indexToUpdateUnFollow >= 0){
                newState.vacations[indexToUpdateUnFollow].isFollowing = false
                newState.vacations[indexToUpdateUnFollow].followersCount --

            }
            
            break
    }

    return newState
}

export const vacationStore = createStore(vacationsReducer)