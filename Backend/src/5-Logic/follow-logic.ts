import { OkPacket } from "mysql";
import dal from "../2-Utils/dal";
import { ValidationErrorModel } from "../4-Models/error-model";
import FollowerModel from "../4-Models/follower-model";

//Get followers table
async function getFollowers(): Promise<FollowerModel> {
    const sql = `SELECT * FROM followers`;
  
    const followers = await dal.execute(sql);
  
    return followers;
  }
  
  // Check if specific user already follow specific vacation
  async function checkIfFollowed(userCode: number,vacationCode: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT * FROM followers WHERE userCode =? AND vacationCode =?) AS rowExists`;
  
    const isFollowed = await dal.execute(sql, [userCode, vacationCode]);
  
    return isFollowed[0].rowExists === 1;
  }
  
  //Add to favorite function
  async function addToFavorites(follow: FollowerModel): Promise<void> {
    const error = follow.validate();
    if (error) throw new ValidationErrorModel(error);
  
    const alreadyFollowed = await checkIfFollowed(follow.userCode,follow.vacationCode); // return true if user follows specific vacation
  
    if (alreadyFollowed) {
      await deleteFromFavorites(follow);
    } else {
      const sql = `INSERT INTO followers VALUES(DEFAULT,?,?)`;
  
      const info: OkPacket = await dal.execute(sql, [
        follow.userCode,
        follow.vacationCode,
      ]);
      follow.followerId = info.insertId;
    }
  }
  
  //Delete from favorites function
  async function deleteFromFavorites(follow: FollowerModel): Promise<void> {
      
  
  }

  export default{
    getFollowers,
    checkIfFollowed,
    addToFavorites,
    deleteFromFavorites
    
  }