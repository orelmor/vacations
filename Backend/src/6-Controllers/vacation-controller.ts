import express, { NextFunction, Request,Response } from "express";
import vacationsLogic from "../5-Logic/vacations-logic";
import verifyLoggedIn from "../3-Middleware/verify-logged-in";


const vacationController = express.Router()

// Getting all vacations rout
vacationController.get("/vacations",[verifyLoggedIn],async (request:Request, response:Response,next:NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsASC()
        response.status(200).json(vacations)
        
    } catch (err:any) {
        next(err)
    }
})

// Get all followed vacations by user
vacationController.get("/vacations/following/:userCode",[verifyLoggedIn],async (request:Request, response:Response,next:NextFunction) => {
    try {
        const userCode = +request.params.userCode
        const vacations = await vacationsLogic.getVacationsFollowedByUser(userCode)
        response.status(200).json(vacations)
        
    } catch (err:any) {
        next(err)
    }
})

// Getting all vacation that did not start yet
vacationController.get("/futureVacations",[verifyLoggedIn],async (request:Request, response:Response,next:NextFunction) => {
    try {
        const vacations = await vacationsLogic.getFutureVacations()
        response.status(200).json(vacations)
        
    } catch (err:any) {
        next(err)
    }
})

// Getting all current active vacations
vacationController.get("/activeVacations",[verifyLoggedIn],async (request:Request, response:Response,next:NextFunction) => {
    try {
        const vacations = await vacationsLogic.getActiveVacations()
        response.status(200).json(vacations)
        
    } catch (err:any) {
        next(err)
    }
})





export default vacationController