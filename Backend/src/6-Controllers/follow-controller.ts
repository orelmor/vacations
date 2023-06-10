import express, { NextFunction,Request,Response } from "express"
import verifyLoggedIn from "../3-Middleware/verify-logged-in"
import FollowerModel from "../4-Models/follower-model"
import followLogic from "../5-Logic/follow-logic"


const followController = express.Router()

// Add vacation to favorites
followController.post("/vacations-addToFavs",[verifyLoggedIn],async (request:Request, response:Response,next:NextFunction) => {
    try {
        const follow = new FollowerModel(request.body)
        await followLogic.addToFavorites(follow)
        response.sendStatus(201)
        
    } catch (err:any) {
        next(err)
    }
})



// Delete vacation from favorites
followController.delete("/vacations-deleteFromFavs",[verifyLoggedIn],async (request:Request, response:Response,next:NextFunction) => {
    try {
       const follow = new FollowerModel(request.body)
       await followLogic.deleteFromFavorites(follow)
        response.sendStatus(204)
        
    } catch (err:any) {
        next(err)
    }
})

export default followController