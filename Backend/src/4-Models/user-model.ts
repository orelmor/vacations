import RoleModel from "./role-model"
import Joi from "joi"

class UserModel{
    public userCode:number
    public firstName:string
    public lastName:string
    public email:string
    public password: string
    public role:RoleModel

    public constructor(user:UserModel){
        this.userCode = user.userCode
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.password = user.password
        this.role = user.role
    }

    public static validationSchema = Joi.object({
        userCode: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(25),
        lastName: Joi.string().required().min(2).max(25),
        email: Joi.string().required().email().max(50),
        password: Joi.string().required().min(4).max(25),
        role: Joi.string().optional()
    })

    public validate():string{
        const response = UserModel.validationSchema.validate(this)
        return response.error?.message
    }

}

export default UserModel