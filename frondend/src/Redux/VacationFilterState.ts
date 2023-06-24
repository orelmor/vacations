import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationsFilterState {
  public activeVacations: VacationModel[] = [];
  public futureVacations: VacationModel[] = [];
  public followingVacations: VacationModel[] = [];
}

export enum VacationsFilterActionType {
  FetchActiveVacations,
  FetchFutureVacations,
  FetchFollowingVacations,
}

export interface VacationsFilterAction {
  type: VacationsFilterActionType;
  payload: any;
}

export function vacationsFilterReducer(currentState = new VacationsFilterState(),action: VacationsFilterAction): VacationsFilterState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationsFilterActionType.FetchActiveVacations:
      newState.activeVacations = action.payload;
      break;
    case VacationsFilterActionType.FetchFutureVacations:
      newState.futureVacations = action.payload;
      break;
    case VacationsFilterActionType.FetchFollowingVacations:
        newState.followingVacations = action.payload;
        break;
  }

  return newState;
}

export const vacationFilterStore = createStore(vacationsFilterReducer);
