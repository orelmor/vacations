import express, { NextFunction, Request,Response } from "express";
import vacationsLogic from "../5-Logic/vacations-logic";
import verifyLoggedIn from "../3-Middleware/verify-logged-in";
import path from "path";
import followLogic from "../5-Logic/follow-logic";


const vacationController = express.Router()

// Get number of folllowers
vacationController.get("/num-of-user-follow/:vacationCode",verifyLoggedIn,async (request:Request, response:Response,next:NextFunction) => {
    try {
        const vacationCode = +request.params.vacationCode
        const count = await followLogic.countFollowersByVacationCode(vacationCode)
        response.json(count)
        
    } catch (err:any) {
        next(err)
    }
})

// Getting all vacations rout
vacationController.get("/vacations",verifyLoggedIn,async (request:Request, response:Response,next:NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsASC()
        response.status(200).json(vacations)
        
    } catch (err:any) {
        next(err)
    }
})

// Get vacation image
vacationController.get("/vacations/images/:imageName",async (request:Request, response:Response,next:NextFunction) => {
    try {
      const imageName = request.params.imageName
      const absolutePath = path.join(__dirname,"..","1-Assets","images",imageName)
        response.sendFile(absolutePath)
        
    } catch (err:any) {
        next(err)
    }
})

// Get one
vacationController.get("/vacations/:vacationCode",verifyLoggedIn,async (request:Request, response:Response,next:NextFunction) => {
    try {
        const code = +request.params.vacationCode
        const vacation = await vacationsLogic.getOneVacation(code)
        response.status(200).json(vacation)
        
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