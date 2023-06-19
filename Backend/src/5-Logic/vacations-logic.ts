import { OkPacket } from "mysql";
import dal from "../2-Utils/dal";
import VacationModel from "../4-Models/vacation-model";
import {
  ResourceNotFoundErrorModel,
  ValidationErrorModel,
} from "../4-Models/error-model";
import FollowerModel from "../4-Models/follower-model";

// Get all vacations order by ascending Date
async function getAllVacationsASC(): Promise<VacationModel[]> {
  const sql = `SELECT * FROM vacations ORDER BY startDate ASC`;

  const vacations = await dal.execute(sql);

  return vacations;
}

async function getOneVacation(vacationCode:number):Promise<VacationModel>{
  const sql = `SELECT * FROM vacations WHERE vacationCode = ?`

  const vacationContainer = await dal.execute(sql,[vacationCode])

  const vacation = vacationContainer[0]
  if(!vacation) throw new ResourceNotFoundErrorModel(vacationCode)
  
  return vacation
}

// Get all Vacation followerd by user
async function getVacationsFollowedByUser(userCode: number): Promise<VacationModel[]> {
  const sql = `SELECT V.* FROM followers as F JOIN vacations AS V
    ON V.vacationCode = F.vacationCode
    WHERE F.userCode =?`;

  const vacations = await dal.execute(sql, [userCode]);

  return vacations;
}

// Get vacations that did not start yet
async function getFutureVacations(): Promise<VacationModel[]> {
  const now = new Date();

  const sql = `SELECT * FROM vacations WHERE vacations.startDate > ?`;

  const vacations = await dal.execute(sql, [now]);

  return vacations;
}

// Get all ongoing vacations
async function getActiveVacations(): Promise<VacationModel[]> {
  const now = new Date();

  const sql = `SELECT * FROM vacations WHERE vacations.startDate < ? AND vacations.endDate > ?`;

  const vacations = await dal.execute(sql, [now, now]);

  return vacations;
}



export default {
  
  getAllVacationsASC,
  getVacationsFollowedByUser,
  getFutureVacations,
  getActiveVacations,
  getOneVacation
  
};
