import UserModel from "../4-Models/user-model";
import { Request } from "express";
import jwt from 'jsonwebtoken'
import RoleModel from "../4-Models/role-model";

const secretKey = "vacationTime"

async function getNewToken(user:UserModel):Promise<string> {
    const container = { user}
    const options = { expiresIn:"4h"}
    const token = jwt.sign(container,secretKey,options)
    return token
}

async function verifyToken(request:Request):Promise<boolean>{
 return new Promise<boolean>((resolve,reject)=>{
    try {
        const header = request.header("authorization")
        if(!header){
            resolve(false)
            return
        }

        const token = header.substring(7)
        if(!token){
            resolve(false)
            return
        }

        jwt.verify(token,secretKey,err=>{
            if(err){
                resolve(false)
                return
            }
            resolve(true)
        })
        
    } catch (err:any) {
        reject(err)
    }
 })
}

async function verifyAdmin(request:Request):Promise<boolean>{
    const isLoggen = await verifyToken(request)
    if(!isLoggen){
        return false
    }

    const header = request.header("authorization")
    const token = header.substring(7)

    const container:any = jwt.decode(token)

    const user:UserModel = container.user

    return user.role === RoleModel.admin
}


export default{
    verifyAdmin,
    verifyToken,
    getNewToken
}