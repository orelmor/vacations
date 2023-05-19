import { OkPacket } from "mysql";
import dal from "../2-Utils/dal";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-Models/error-model";
import RoleModel from "../4-Models/role-model";
import UserModel from "../4-Models/user-model";
import authCyber from "../2-Utils/auth-cyber";
import CredentialsModel from "../4-Models/credentials-model";


async function getAllUsers():Promise<UserModel[]> {
    const sql  = `SELECT * FROM users`
    const users = await dal.execute(sql)
    return users
}

async function register(user:UserModel):Promise<string> {
    const error = user.validate()
    if(error) throw new ValidationErrorModel(error)

    // IF email is taken 
    const users = await getAllUsers()

    if(users.some(u=> u.email === user.email)){
        throw new ValidationErrorModel(`${user.email} is already in use`)
    }

    // Define user role is always user and not admin
    user.role = RoleModel.user

    // Insertion to sql users table
    const sql = `INSERT INTO users VALUES(DEFAULT,?,?,?,?,?)`
    const info:OkPacket = await dal.execute(sql,[user.firstName,user.lastName,user.email,user.password,user.role])
    user.userCode =info.insertId

    //Get new token
    try {
        const token = await authCyber.getNewToken(user)
        return token
    } catch (err:any) {
        throw new UnauthorizedErrorModel(err.message)
        
    }
}

async function  login(credentials:CredentialsModel):Promise<string> {
    const error  = credentials.validate()
    if(error) throw new ValidationErrorModel(error)

    const sql = `SELECT * FROM users AS U
     WHERE U.email =? AND U.password = ?`

     const resonse = await dal.execute(sql,[credentials.email,credentials.password])

     const user = resonse[0]

     if(!user) throw new UnauthorizedErrorModel("Incorrect email or password")

     const token = await authCyber.getNewToken(user)

     return token

}



export default{
    register,
    getAllUsers,
    login
}