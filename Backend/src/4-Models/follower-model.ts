import Joi from "joi"

class FollowerModel{
    public followerId:number
    public userCode:number
    public vacationCode:number

    public constructor(favorite:FollowerModel){
        this.followerId = favorite.followerId
        this.userCode = favorite.userCode
        this.vacationCode = favorite.vacationCode
    }

    public static validationSchema = Joi.object({
        followerId: Joi.number().optional().positive().integer(),
        userCode: Joi.number().required().positive().integer(),
        vacationCode: Joi.number().required().positive().integer()
    })

    public validate():string{
        const response = FollowerModel.validationSchema.validate(this)
        return response.error?.message
    }

    
}

export default FollowerModel