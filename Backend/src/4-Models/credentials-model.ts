import Joi from "joi"

class CredentialsModel{
    public email:string
    public password: string

    public constructor(credentials:CredentialsModel){
        this.email = credentials.email
        this.password = credentials.password
    }

    public static validationSchema = Joi.object({
        email: Joi.string().required().email().max(50),
        password: Joi.string().required().min(4).max(25)
    })

    public validate():string{
        const response = CredentialsModel.validationSchema.validate(this)
        return response.error?.message
    }

}

export default CredentialsModel