import express, { NextFunction, Request,Response } from "express";
import vacationsLogic from "../5-Logic/vacations-logic";


const vacationController = express.Router()


vacationController.get("/vacations",async (request:Request, response:Response,next:NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsASC()
        response.status(200).json(vacations)
        
    } catch (err:any) {
        next(err)
    }
})


vacationController.get("/vacations/following/:userCode",async (request:Request, response:Response,next:NextFunction) => {
    try {
        const userCode = +request.params.userCode
        const vacations = await vacationsLogic.getSpecificVacationsFollowedByUser(userCode)
        response.status(200).json(vacations)
        
    } catch (err:any) {
        next(err)
    }
})

vacationController.get("/futureVacations",async (request:Request, response:Response,next:NextFunction) => {
    try {
        const vacations = await vacationsLogic.getFutureVacations()
        response.status(200).json(vacations)
        
    } catch (err:any) {
        next(err)
    }
})

vacationController.get("/activeVacations",async (request:Request, response:Response,next:NextFunction) => {
    try {
        const vacations = await vacationsLogic.getActiveVacations()
        response.status(200).json(vacations)
        
    } catch (err:any) {
        next(err)
    }
})


export default vacationController