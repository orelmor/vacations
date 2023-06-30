import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationsFilterState {
  public activeVacations: VacationModel[] = [];
  public futureVacations: VacationModel[] = [];
  
}

export enum VacationsFilterActionType {
  FetchActiveVacations,
  FetchFutureVacations,
 
  Follow,
  Unfollow,
}

export interface VacationsFilterAction {
  type: VacationsFilterActionType;
  payload: any;
}

export function vacationsFilterReducer(
  currentState = new VacationsFilterState(),
  action: VacationsFilterAction
): VacationsFilterState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationsFilterActionType.FetchActiveVacations:
      newState.activeVacations = action.payload;
      break;
    case VacationsFilterActionType.FetchFutureVacations:
      newState.futureVacations = action.payload;
      break;
    
    case VacationsFilterActionType.Follow:
      // Change active vacations follow state
      const indexToUpdateFollowActive = newState.activeVacations.findIndex(
        (v) => v.vacationCode === action.payload
      );
      if (indexToUpdateFollowActive >= 0) {
        newState.activeVacations[indexToUpdateFollowActive].isFollowing = true;
        newState.activeVacations[indexToUpdateFollowActive].followersCount++;
      }

      // Change future vacations follow state
      const indexToUpdateFollowFuture = newState.futureVacations.findIndex(
        (v) => v.vacationCode === action.payload
      );
      if (indexToUpdateFollowFuture >= 0) {
        newState.futureVacations[indexToUpdateFollowFuture].isFollowing = true;
        newState.futureVacations[indexToUpdateFollowFuture].followersCount++;
      }
      break;

    case VacationsFilterActionType.Unfollow:
      // Change active vacations follow state
      const indexToUpdateUnFollowActive = newState.activeVacations.findIndex(
        (v) => v.vacationCode === action.payload
      );
      if (indexToUpdateUnFollowActive >= 0) {
        newState.activeVacations[indexToUpdateUnFollowActive].isFollowing =
          false;
        newState.activeVacations[indexToUpdateUnFollowActive].followersCount--;
      }

      // Change future vacations follow state
      const indexToUpdateUnFollowFuture = newState.futureVacations.findIndex(
        (v) => v.vacationCode === action.payload
      );
      if (indexToUpdateUnFollowFuture >= 0) {
        newState.futureVacations[indexToUpdateUnFollowFuture].isFollowing =
          false;
        newState.futureVacations[indexToUpdateUnFollowFuture].followersCount--;
      }

      break;
  }

  return newState;
}

export const vacationFilterStore = createStore(vacationsFilterReducer);
