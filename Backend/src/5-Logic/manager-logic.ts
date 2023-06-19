import { OkPacket } from "mysql";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-Models/error-model";
import VacationModel from "../4-Models/vacation-model";
import dal from "../2-Utils/dal";
import {v4 as uuid} from "uuid"
import fs from "fs"
import vacationsLogic from "./vacations-logic";



// All logic here needs admin verification to procceed


// Posting new vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const error = vacation.validate();
    if (error) throw new ValidationErrorModel(error) // if vacation is not valid throw error

    if(!vacation.image) throw new ValidationErrorModel("Missing image")
    
        // Creating extension
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = uuid() + extension // Generating new id + extension
        await vacation.image.mv("./src/1-Assets/images/" + vacation.imageName) // Save to backend assets
        delete vacation.image // Delete before inserting to sql
    

    const sql = `INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?)`

    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName])

    vacation.vacationCode = info.insertId
    return vacation
}


// Updating existing vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate()
    if (error) throw new ValidationErrorModel(error) // if vacation is not valid throw error

    
    if(vacation.image){
        if(fs.existsSync("./src/1-Assets/images/" + vacation.imageName)){
            fs.unlinkSync("./src/1-Assets/images/" + vacation.imageName)
        }
       
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = uuid() + extension
        await vacation.image.mv("./src/1-Assets/images/"+vacation.imageName)
        delete vacation.image
    }

    const sql = `UPDATE vacations SET 
                    destination=?,
                    description=?,
                    startDate=?,
                    endDate=?,
                    price=?,
                    imageName=?
                    WHERE vacationCode = ?

    `
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName,vacation.vacationCode])

    // If no rows were effected vacationCode not found
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationCode)

    return vacation
}


// Delete vacation
async function deleteVacation(vacationCode: number): Promise<void> {

    // Delete vacation if exists
    const vacation = await vacationsLogic.getOneVacation(vacationCode)


    const sql = `DELETE FROM vacations WHERE vacationCode = ?`
    const info: OkPacket = await dal.execute(sql, [vacationCode])
    
        // If no rows were effected vacationCode not found
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationCode)

    fs.unlinkSync("./src/1-Assets/images/"+ vacation.imageName)


}

export default {
    addVacation,
    updateVacation,
    deleteVacation
}