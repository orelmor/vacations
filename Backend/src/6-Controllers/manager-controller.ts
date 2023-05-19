import express, { NextFunction,Request,Response } from 'express'
import verifyAdmin from '../3-Middleware/verify-admin'
import VacationModel from '../4-Models/vacation-model'
import managerLogic from '../5-Logic/manager-logic'

const managerController = express.Router()

managerController.post("/vacations",[verifyAdmin],async (request:Request,response:Response,next:NextFunction) => {
    
    try {
        const vacation = new VacationModel(request.body)
        const addedVacation = await managerLogic.addVacation(vacation)
        response.status(201).json(addedVacation)

    } catch (err:any) {
        next(err)
    }
})  

managerController.patch("/vacations/:vacationCode",[verifyAdmin],async (request:Request,response:Response,next:NextFunction) => {
    
    try {
        request.body.vacationCode = +request.params.vacationCode;
        const vacation = new VacationModel(request.body)
        const updatedVacation = await managerLogic.updateVacation(vacation)
        response.json(updatedVacation)


       
    } catch (err:any) {
        next(err)
    }
})  

managerController.delete("/vacations/:vacationCode",[verifyAdmin],async (request:Request,response:Response,next:NextFunction) => {
    
    try {
        const vacationCode = +request.params.vacationCode
        await managerLogic.deleteVacation(vacationCode)
        response.sendStatus(204)
       
    } catch (err:any) {
        next(err)
    }
}) 

export default managerController