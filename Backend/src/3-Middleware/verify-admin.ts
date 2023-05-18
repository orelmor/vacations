import { NextFunction, Request, Response } from "express";
import authCyber from "../2-Utils/auth-cyber";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-Models/error-model";

async function verifyAdmin( request: Request, response: Response, next: NextFunction) {
    try {
        const isAdmin = await authCyber.verifyAdmin(request)
        if(!isAdmin) throw new UnauthorizedErrorModel("Unauthorized access, You are not Admin")
        next()
    } catch (err:any) {
        next(err)
    }
}

export default verifyAdmin;