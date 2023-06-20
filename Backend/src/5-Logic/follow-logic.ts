import { OkPacket } from "mysql";
import dal from "../2-Utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-Models/error-model";
import FollowerModel from "../4-Models/follower-model";

//Get followers table
async function getFollowers(): Promise<FollowerModel> {
    const sql = `SELECT * FROM followers`;
  
    const followers = await dal.execute(sql);
  
    return followers;
  }

  // How many users follow vacation by code
async function countFollowersByVacationCode(vacationCode:number):Promise<number>{
    const sql = `SELECT COUNT(*) AS counter FROM followers WHERE vacationCode =?`
    const response = await dal.execute(sql,[vacationCode])
    const counterResult = (response[0].counter)
    return counterResult
} 


  
  // Check if specific user is already following specific vacation
  async function checkIfFollowed(userCode: number,vacationCode: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT * FROM followers WHERE userCode =? AND vacationCode =?) AS rowExists`;
  
    const isFollowed = await dal.execute(sql, [userCode, vacationCode]);
  
    // Returns true if following
    return isFollowed[0].rowExists === 1;
  }
  
  //Add to favorite function
  async function addToFavorites(userCode:number,vacationCode:number): Promise<void> {
    
  
    const alreadyFollowed = await checkIfFollowed(userCode,vacationCode); // return true if user follows specific vacation
  
    if (alreadyFollowed) {
      await deleteFromFavorites(userCode,vacationCode);
    } else {
      const sql = `INSERT INTO followers VALUES(?,?,DEFAULT)`;
  
      const info: OkPacket = await dal.execute(sql, [
        userCode,
        vacationCode,
      ]);
      
    }
  }
  
  //Delete from favorites function
  async function deleteFromFavorites(userCode:number,vacationCode:number): Promise<void> {

   
  
    const alreadyFollowed = await checkIfFollowed(userCode,vacationCode); // return true if user follows specific vacation

    if(alreadyFollowed){ // if following remove
        const sql = `DELETE FROM followers WHERE userCode =? AND vacationCode =?`
        const info:OkPacket = await dal.execute(sql,[userCode,vacationCode])

    }else{ // if is not following add
        addToFavorites(userCode,vacationCode)
    }
  
  }

  export default{
    getFollowers,
    checkIfFollowed,
    addToFavorites,
    deleteFromFavorites,
    countFollowersByVacationCode
    
  }