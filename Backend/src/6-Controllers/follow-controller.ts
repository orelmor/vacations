import express, { NextFunction,Request,Response } from "express"
import verifyLoggedIn from "../3-Middleware/verify-logged-in"


const followController = express.Router()

// Add vacation to favorites
followController.post("/vacations/addToFavs",[verifyLoggedIn],async (request:Request, response:Response,next:NextFunction) => {
    try {
        
        response.sendStatus(201)
        
    } catch (err:any) {
        next(err)
    }
})



// Delete vacation from favorites
followController.delete("/vacations/deleteFromFavs",[verifyLoggedIn],async (request:Request, response:Response,next:NextFunction) => {
    try {
       
        response.sendStatus(204)
        
    } catch (err:any) {
        next(err)
    }
})

export default followController