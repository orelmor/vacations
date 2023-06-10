import Joi from "joi"

class VacationModel{
    public vacationCode:number
    public destination:string
    public description:string
    public startDate:string
    public endDate:string
    public price:number
    public imageName:string


    public constructor(vacation:VacationModel){
        this.vacationCode = vacation.vacationCode
        this.destination = vacation.destination
        this.description = vacation.description
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.price = vacation.price
        this.imageName = vacation.imageName
    }


    public static validationSchema = Joi.object({
        vacationCode: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().min(2).max(35),
        description: Joi.string().required().min(5).max(500),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price:Joi.number().required().positive().integer().min(1).max(10000),
        imageName: Joi.string().required()
       
    })


    public validate():string{
        const result = VacationModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default VacationModel