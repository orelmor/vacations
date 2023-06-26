import { OkPacket } from "mysql";
import dal from "../2-Utils/dal";
import VacationModel from "../4-Models/vacation-model";
import {
  ResourceNotFoundErrorModel,
  ValidationErrorModel,
} from "../4-Models/error-model";

// Get all vacations order by ascending Date
async function getAllVacationsASC(userCode:number): Promise<VacationModel[]> {
  const sql = `
        SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM followers WHERE vacationCode = F.vacationCode AND userCode = ?) AS isFollowing,
            COUNT(F.userCode) AS followersCount, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate, DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate
            FROM vacations AS V LEFT JOIN followers AS F
            ON V.vacationCode = F.vacationCode
            GROUP BY vacationCode
            ORDER BY V.startDate DESC`;


  const vacations = await dal.execute(sql,[userCode]);

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

  const sql = `
  SELECT DISTINCT
      V.*,
      EXISTS(SELECT * FROM followers WHERE vacationCode = F.vacationCode AND userCode = ?) AS isFollowing,
      COUNT(F.userCode) AS followersCount, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate, DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationCode = F.vacationCode
      WHERE F.userCode = ?
      GROUP BY vacationCode
      ORDER BY V.startDate DESC`;


  const vacations = await dal.execute(sql, [userCode,userCode]);

  return vacations;
}

// Get vacations that did not start yet
async function getFutureVacations(userCode:number): Promise<VacationModel[]> {
  const now = new Date();
  const sql = `
  SELECT DISTINCT
      V.*,
      EXISTS(SELECT * FROM followers WHERE vacationCode = F.vacationCode AND userCode = ?) AS isFollowing,
      COUNT(F.userCode) AS followersCount, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate, DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationCode = F.vacationCode
      WHERE V.startDate > ?
      GROUP BY vacationCode
      ORDER BY V.startDate DESC`;


  const vacations = await dal.execute(sql, [userCode,now]);

  return vacations;
}

// Get all ongoing vacations
async function getActiveVacations(userCode:number): Promise<VacationModel[]> {
  const now = new Date();

  
  const sql = `
  SELECT DISTINCT
      V.*,
      EXISTS(SELECT * FROM followers WHERE vacationCode = F.vacationCode AND userCode = ?) AS isFollowing,
      COUNT(F.userCode) AS followersCount, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate, DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationCode = F.vacationCode
      WHERE V.startDate < ? AND V.endDate > ?
      GROUP BY vacationCode
      ORDER BY V.startDate DESC`;

  const vacations = await dal.execute(sql, [userCode,now,now]);

  return vacations;
}



export default {
  
  getAllVacationsASC,
  getVacationsFollowedByUser,
  getFutureVacations,
  getActiveVacations,
  getOneVacation
  
};
